package com.mercedes.barberia.domain.Modul.catalogo;

import lombok.*;

import java.math.BigDecimal;
@Getter
@Setter
@Builder
public class Servicio {
    private Long id;
    private String nombre;
    private int duracionMin;
    private BigDecimal precio;
    private boolean activo;

    // Constructor vacío
    public Servicio() {
    }

    // Constructor completo
    public Servicio(Long id, String nombre, int duracionMin, BigDecimal precio, boolean activo) {
        this.id = id;
        this.nombre = nombre;
        this.duracionMin = duracionMin;
        this.precio = precio;
        this.activo = activo;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getDuracionMin() {
        return duracionMin;
    }

    public void setDuracionMin(int duracionMin) {
        this.duracionMin = duracionMin;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public Boolean getActivo() {
        return null;
    }
}
}
