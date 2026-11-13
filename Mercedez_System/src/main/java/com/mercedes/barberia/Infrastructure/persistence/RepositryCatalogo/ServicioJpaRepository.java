package com.mercedes.barberia.Infrastructure.persistence.RepositryCatalogo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ServicioJpaRepository extends JpaRepository<ServicioEntity, Long> {
    boolean existsByNombre(String nombre);
    Optional<ServicioEntity> findByNombre(String nombre);
}
