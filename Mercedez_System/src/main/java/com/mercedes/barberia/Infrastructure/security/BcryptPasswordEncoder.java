package com.mercedes.barberia.Infrastructure.security;

import com.mercedes.barberia.domain.ports.out.outUser.PasswordEncoder;
import org.mindrot.jbcrypt.BCrypt;

import org.springframework.stereotype.Component;

@Component
public class BcryptPasswordEncoder implements PasswordEncoder {
    @Override
    public String encriptar(String passwordPlano) {
        return  BCrypt.hashpw(passwordPlano, BCrypt.gensalt());
    }

    @Override
    public boolean coincide(String passwordPlano, String passwordHash) {
        return BCrypt.checkpw(passwordPlano, passwordHash);
    }
}
