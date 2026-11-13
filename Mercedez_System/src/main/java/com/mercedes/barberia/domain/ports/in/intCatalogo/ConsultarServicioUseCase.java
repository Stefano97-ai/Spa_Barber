package com.mercedes.barberia.domain.ports.in.intCatalogo;

import com.mercedes.barberia.domain.Modul.catalogo.Servicio;

import java.util.List;
import java.util.Optional;

public interface ConsultarServicioUseCase {
    List<Servicio> obtenerServiciosActivos();
    List<Servicio> obtenerTodosLosServicios();
    Optional<Servicio> buscarPorId(Long id);
}
