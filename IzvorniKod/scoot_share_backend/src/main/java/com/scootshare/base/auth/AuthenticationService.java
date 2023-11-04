package com.scootshare.base.auth;

import com.scootshare.base.config.JwtService;
import com.scootshare.base.entities.User;
import com.scootshare.base.services.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request, String idCard, String criminalRecord) {

        User user = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getNickname(),
                passwordEncoder.encode(request.getPassword()),
                request.getCardNumber(),
                request.getEmail(),
                Objects.equals(idCard, "x") ?null:idCard.getBytes(),
                Objects.equals(criminalRecord, "x")?null: criminalRecord.getBytes());
        userService.store(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userService.findByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}
