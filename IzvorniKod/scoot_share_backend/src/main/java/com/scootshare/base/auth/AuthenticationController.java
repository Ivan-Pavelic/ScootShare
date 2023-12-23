package com.scootshare.base.auth;

import com.scootshare.base.config.JwtService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final JwtService jwtService;

    @PostMapping(value = "/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> register(@RequestParam("user") String user,
                                      @RequestParam(name="idCard") String idCard, @RequestParam(name="criminalRecord") String criminalRecord
    ) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            RegisterRequest registerRequest = objectMapper.readValue(user, RegisterRequest.class);
            return ResponseEntity.ok(service.register(registerRequest, idCard, criminalRecord));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid register request.");
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token	) {
        boolean validToken = jwtService.isTokenExpired(token);
        return ResponseEntity.ok(!validToken);
    }
}
