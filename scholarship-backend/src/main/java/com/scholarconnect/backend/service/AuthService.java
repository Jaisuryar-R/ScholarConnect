
package com.scholarconnect.backend.service;

import com.scholarconnect.backend.entity.User;
import com.scholarconnect.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        user.setRole("STUDENT");

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public LoginResult login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new RuntimeException("Email not registered"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(
            user.getEmail(),
            user.getRole()
        );

        return new LoginResult(
            token,
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getRole()
        );
    }

    public record LoginResult(
        String token,
        Long id,
        String fullName,
        String email,
        String role
    ) {}
}
