package com.mercedes.barberia.Infrastructure.security;

import com.mercedes.barberia.domain.Modul.usuario.Usuario;
import com.mercedes.barberia.domain.ports.out.outUser.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider implements TokenProvider {

    private final SecretKey secretKey;
    private final long expiracionMs;


    public JwtTokenProvider(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long  expiracionMs) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expiracionMs = expiracionMs;
    }


    @Override
    public String generarToken(Usuario usuario) {

        Date ahora = new Date();
        Date expiracion = new Date(ahora.getTime() + expiracionMs);
        return Jwts.builder().
                subject(String.valueOf(usuario.getId()))
                .claim("rol", usuario.getRol().name())
                .claim("nombre", usuario.getNombre())
                .issuedAt(ahora)
                .expiration(expiracion)
                .signWith(secretKey , SignatureAlgorithm.HS256).
                compact();


    }

    @Override
    public boolean esValido(String token) {

        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims obtenerClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey).build().parseSignedClaims(token).getPayload();

    }

    @Override
    public Long obtenerUsuarioId(String token) {
        return  Long.valueOf(obtenerClaims(token).getSubject());
    }

    @Override
    public String obtenerRol(String token) {
        return obtenerClaims(token).get("rol" ,  String.class);
    }
}
