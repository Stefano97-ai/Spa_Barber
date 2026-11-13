package com.mercedes.barberia.application.serviceUsuario;

import com.mercedes.barberia.domain.Modul.usuario.AutenticacionResultado;
import com.mercedes.barberia.domain.Modul.usuario.Usuario;
import com.mercedes.barberia.domain.exception.CredencialesInvalidasException;
import com.mercedes.barberia.domain.ports.in.intUser.AutenticarUsuarioUseCase;
import com.mercedes.barberia.domain.ports.out.outUser.PasswordEncoder;
import com.mercedes.barberia.domain.ports.out.outUser.TokenProvider;
import com.mercedes.barberia.domain.ports.out.outUser.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class AutenticarUsuarioService implements AutenticarUsuarioUseCase {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;



    @Override
    public AutenticacionResultado autenticar(String email, String password) {
        Usuario usuario = usuarioRepository.buscarPorEmail(email).orElseThrow(()-> new CredencialesInvalidasException("Email o contraseña incorrecta"));

        if (!passwordEncoder.coincide(password, usuario.getPasswordHash())) {
            throw new CredencialesInvalidasException("Email o contraseña incorrectos");
        }
        String token = tokenProvider.generarToken(usuario);

        return new AutenticacionResultado(usuario, token);

    }
}
