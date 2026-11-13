package com.mercedes.barberia.domain.ports.in.intCatalogo;

import com.mercedes.barberia.domain.Modul.catalogo.Servicio;

import java.math.BigDecimal;

public interface GestionarServiceUseCase {
    Servicio crear(String nombre, int duracionMin, BigDecimal precio);
    Servicio editar(Long id, String nombre, int duracionMin, BigDecimal precio);
    void desactivar(Long id);   // ← este SÍ es void, fíjate

}
