package com.mercedes.barberia.Infrastructure.rest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistroRequest(@NotBlank(message = "El nombre es obligatorio")
                              String nombre,

                              @NotBlank(message = "El email es obligatorio")
                              @Email(message = "El email no tiene un formato válido")
                              String email,

                              String telefono,

                              @NotBlank(message = "La contraseña es obligatoria")
                              String password) {
    }
