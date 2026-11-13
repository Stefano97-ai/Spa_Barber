package com.mercedes.barberia.Infrastructure.rest.dto.DtoCatalogo;

import com.mercedes.barberia.domain.Modul.catalogo.Servicio;

import java.math.BigDecimal;

public record ServicioResponse(
        Long id,
        String nombre,
        Integer duracionMin,
        BigDecimal precio,
        Boolean activo
) {
    public static ServicioResponse fromDomain(Servicio servicio) {
        return new ServicioResponse(
                servicio.getId(),
                servicio.getNombre(),
                servicio.getDuracionMin(),
                servicio.getPrecio(),
                servicio.getActivo()
                
        );
    }
}
