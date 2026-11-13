package com.mercedes.barberia.Infrastructure.rest.dto;

public record AuthResponse(Long id,
                           String nombre,
                           String email,
                           String rol,
                           String token
) {}

