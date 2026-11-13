package com.mercedes.barberia.Infrastructure.persistence.RepositoryUsuario;

import com.mercedes.barberia.domain.Modul.usuario.Usuario;
import com.mercedes.barberia.domain.ports.out.outUser.UsuarioRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;
@AllArgsConstructor
@Component
public class UsuarioRepositoryAdapter implements UsuarioRepository {
    private final UsuarioJpaRepository usuarioJpaRepository;

    @Override
    public Usuario guardar(Usuario usuario) {
        UsuarioEntity usuarioEntity = new UsuarioEntity();
        usuarioEntity.setNombre(usuario.getNombre());
        usuarioEntity.setEmail(usuario.getEmail());
        usuarioEntity.setTelefono(usuario.getTelefono());
        usuarioEntity.setPasswordHash(usuario.getPasswordHash());
        usuarioEntity.setRol(usuario.getRol());
        usuarioEntity.setActivo((usuario.isActivo()));
        usuarioEntity.setCreatedAt(LocalDateTime.now());
        usuarioEntity.setUpdatedAt(LocalDateTime.now());

        UsuarioEntity guardado = usuarioJpaRepository.save(usuarioEntity);
        return mapToDomain(guardado);
    }

    @Override
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioJpaRepository.findByEmail(email).map(this::mapToDomain);

    }

    @Override
    public boolean existePorEmail(String email) {
        return usuarioJpaRepository.existsByEmail(email);
    }

    private Usuario mapToDomain (UsuarioEntity entity) {
        return new Usuario(
                entity.getId(),
                entity.getNombre(),
                entity.getEmail(),
                entity.getTelefono(),
                entity.getPasswordHash(),
                entity.getRol(),
                entity.isActivo(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }



}
