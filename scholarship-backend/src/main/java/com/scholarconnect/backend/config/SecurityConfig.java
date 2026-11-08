
package com.scholarconnect.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("Authorization", "Content-Type")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // Public authentication
                .requestMatchers("/api/auth/**").permitAll()

                // Public scholarship browsing
                .requestMatchers(HttpMethod.GET, "/api/scholarships/**")
                    .permitAll()

                // Admin scholarship management
                .requestMatchers(HttpMethod.POST, "/api/scholarships/**")
                    .hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/scholarships/**")
                    .hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/scholarships/**")
                    .hasRole("ADMIN")

                // Admin application management
                .requestMatchers(HttpMethod.GET, "/api/applications")
                    .hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/applications/*/status")
                    .hasRole("ADMIN")

                // Student application operations
                .requestMatchers(HttpMethod.POST, "/api/applications/**")
                    .hasRole("STUDENT")
                .requestMatchers(HttpMethod.GET, "/api/applications/student/**")
                    .hasRole("STUDENT")

                // Student profile and recommendation operations
                .requestMatchers("/api/students/**")
                    .hasRole("STUDENT")
                .requestMatchers("/api/recommendations/**")
                    .hasRole("STUDENT")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
