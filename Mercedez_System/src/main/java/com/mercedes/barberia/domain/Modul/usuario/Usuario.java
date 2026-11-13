package com.mercedes.barberia.domain.Modul.usuario;

import lombok.Builder;

import java.time.LocalDateTime;
@Builder
public class Usuario {

    private Long id;
    private String nombre;
    private String email;
    private String telefono;    
    private String passwordHash;
    private Rol rol;
    private boolean activo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;




    public Usuario(String nombre, String email, String telefono, String passwordHash, Rol rol) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.passwordHash = passwordHash;
        this.rol = rol;
        this.activo = true;
    }

    public Usuario(Long id, String nombre, String email, String telefono, String passwordHash,
                   Rol rol, boolean activo, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.passwordHash = passwordHash;
        this.rol = rol;
        this.activo = activo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public boolean esCliente() {
        return this.rol == Rol.CLIENTE;
    }

    public boolean esBarbero() {
        return this.rol == Rol.BARBERO;
    }

    public void desactivar() {
        this.activo = false;
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public String getTelefono() { return telefono; }
    public String getPasswordHash() { return passwordHash; }
    public Rol getRol() { return rol; }
    public boolean isActivo() { return activo; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
