package com.mercedes.barberia.Infrastructure.persistence.RepositryCatalogo;

import com.mercedes.barberia.domain.Modul.catalogo.Servicio;
import com.mercedes.barberia.domain.ports.out.outCatalogo.CatalogoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ServicioRepositoryAdapter implements CatalogoRepository {
    private final ServicioJpaRepository servicioJpaRepository;

    public ServicioRepositoryAdapter(ServicioJpaRepository servicioJpaRepository) {
        this.servicioJpaRepository = servicioJpaRepository;
    }

    @Override
    public Servicio guardar(Servicio servicio) {
        ServicioEntity servicioEntity = toEntity(servicio);
        servicioEntity = servicioJpaRepository.save(servicioEntity);
        return toDomain(servicioEntity);

    }

    @Override
    public Optional<Servicio> buscarPorId(Long id) {
        return servicioJpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Servicio> buscarTodos() {
        return servicioJpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<Servicio> buscarActivos() {
        return List.of();
    }

    @Override
    public boolean existePorNombre(String nombre) {
     return servicioJpaRepository.existsByNombre(nombre);
    }

    private ServicioEntity toEntity(Servicio servicio) {
        return ServicioEntity.builder()
                .id(servicio.getId())
                .nombre(servicio.getNombre())
                .duracionMin(servicio.getDuracionMin())
                .precio(servicio.getPrecio())
                .activo(servicio.getActivo())
                .build();
    }
    private Servicio toDomain(ServicioEntity entity) {
        return Servicio.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .duracionMin(entity.getDuracionMin())
                .precio(entity.getPrecio())
                .activo(entity.getActivo())
                .build();
    }
}
