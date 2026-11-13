package com.mercedes.barberia.Infrastructure.rest;


import com.mercedes.barberia.Infrastructure.rest.dto.AuthResponse;
import com.mercedes.barberia.Infrastructure.rest.dto.LoginRequest;
import com.mercedes.barberia.Infrastructure.rest.dto.RegistroRequest;
import com.mercedes.barberia.domain.Modul.usuario.AutenticacionResultado;
import com.mercedes.barberia.domain.Modul.usuario.Usuario;
import com.mercedes.barberia.domain.ports.in.intUser.AutenticarUsuarioUseCase;
import com.mercedes.barberia.domain.ports.in.intUser.RegistrarClienteUseCase;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AutenticarUsuarioUseCase autenticarUsuario;

    private final RegistrarClienteUseCase registrarCliente;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AutenticacionResultado resultado = autenticarUsuario.autenticar(request.email(), request.password());
        AuthResponse response = new AuthResponse(resultado.usuario().getId(),
                resultado.usuario().getNombre(),
                resultado.usuario().getEmail(),
                resultado.usuario().getRol().name(),
                resultado.token()
                );
        return ResponseEntity.ok(response);


    }


    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registrar(@RequestBody RegistroRequest request) {

       Usuario usuario = registrarCliente.registrar(request.nombre(), request.email(),  request.telefono(), request.password());

       AuthResponse response = new AuthResponse(
               usuario.getId(),
               usuario.getNombre(),
               usuario.getEmail(),
               usuario.getRol().name(),
               null);
       return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }



    }








