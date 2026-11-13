package com.mercedes.barberia.application.serviceUsuario;

import com.mercedes.barberia.domain.Modul.usuario.Rol;
import com.mercedes.barberia.domain.Modul.usuario.Usuario;
import com.mercedes.barberia.domain.exception.EmailDuplicadoException;
import com.mercedes.barberia.domain.ports.in.intUser.RegistrarClienteUseCase;
import com.mercedes.barberia.domain.ports.out.outUser.PasswordEncoder;
import com.mercedes.barberia.domain.ports.out.outUser.UsuarioRepository;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrarClienteService implements RegistrarClienteUseCase {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public Usuario registrar(String nombre, String email, String telefono, String password) {
        if (usuarioRepository.existePorEmail(email)) {
         throw new EmailDuplicadoException("Ya existe un usuario con este email " + email);
        }

          String passwordEncriptado =  passwordEncoder.encriptar(password);
          Usuario usuarioNuevo = new Usuario(nombre, email, telefono, passwordEncriptado, Rol.CLIENTE);
          return usuarioRepository.guardar(usuarioNuevo);
    }
}
