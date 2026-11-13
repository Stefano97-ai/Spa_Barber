package com.mercedes.barberia.Infrastructure.rest.dto.DtoCatalogo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record CrearServicioRequest(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,

        @NotNull(message = "La duración es obligatoria")
        @Positive(message = "La duración debe ser mayor a 0")
        Integer duracionMin,

        @NotNull(message = "El precio es obligatorio")
        @Positive(message = "El precio debe ser mayor a 0")
        BigDecimal precio
) {}