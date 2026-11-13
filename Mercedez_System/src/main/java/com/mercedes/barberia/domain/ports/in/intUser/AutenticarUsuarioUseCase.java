package com.mercedes.barberia.domain.ports.in.intUser;

import com.mercedes.barberia.domain.Modul.usuario.AutenticacionResultado;

public interface AutenticarUsuarioUseCase {

     AutenticacionResultado autenticar(String email, String password);
}
