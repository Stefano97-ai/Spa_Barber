package com.mercedes.barberia.domain.ports.in.intUser;

import com.mercedes.barberia.domain.Modul.usuario.Usuario;

public interface RegistrarClienteUseCase {

    Usuario registrar(String nombre, String email, String telefono, String password);
}
