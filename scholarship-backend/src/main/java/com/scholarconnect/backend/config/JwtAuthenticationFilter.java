
package com.scholarconnect.backend.config;

import com.scholarconnect.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        System.out.println("JWT FILTER: " + request.getRequestURI());
        System.out.println("AUTH HEADER PRESENT: " + (header != null));

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {
                if (jwtService.isTokenValid(token)) {

                    String email = jwtService.extractEmail(token);
                    String role = jwtService.extractRole(token);

                    System.out.println("JWT VALID");
                    System.out.println("JWT EMAIL: " + email);
                    System.out.println("JWT ROLE: " + role);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
                            );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);

                } else {
                    System.out.println("JWT INVALID");
                }

            } catch (Exception e) {
                System.out.println("JWT ERROR: " + e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}
