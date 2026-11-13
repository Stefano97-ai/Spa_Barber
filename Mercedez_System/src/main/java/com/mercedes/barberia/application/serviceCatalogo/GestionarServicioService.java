package com.mercedes.barberia.application.serviceCatalogo;

import com.mercedes.barberia.domain.Modul.catalogo.Servicio;
import com.mercedes.barberia.domain.ports.in.intCatalogo.GestionarServiceUseCase;
import com.mercedes.barberia.domain.ports.out.outCatalogo.CatalogoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
@Service
public class GestionarServicioService implements GestionarServiceUseCase  {


    private final CatalogoRepository catalogoRepository;

    public GestionarServicioService(CatalogoRepository catalogoRepository) {
        this.catalogoRepository = catalogoRepository;
    }

    @Override
    public Servicio crear(String nombre, int duracionMin, BigDecimal precio) {
        if (catalogoRepository.existePorNombre(nombre)) {
            throw new IllegalArgumentException("Ya existe un catalogo con el nombre: " + nombre);
        }
        Servicio nuevoServicio = Servicio.builder().
                nombre(nombre)
                .duracionMin(duracionMin)
                .precio(precio)
                .activo(true).build();


        return catalogoRepository.guardar(nuevoServicio);
    }

    @Override
    public Servicio editar(Long id, String nombre, int duracionMin, BigDecimal precio) {
        Servicio servicio = catalogoRepository.buscarPorId(id).orElseThrow(() -> new IllegalArgumentException("No se encontro el servicio com el id:" + id));
        if (!servicio.getNombre().equalsIgnoreCase(nombre) && catalogoRepository.existePorNombre(nombre)) {
            throw new IllegalArgumentException("Ya existe un un servicio  con el nombre: " + nombre);
        }
        servicio.setNombre(nombre);
        servicio.setPrecio(precio);
        servicio.setDuracionMin(duracionMin);
        return catalogoRepository.guardar(servicio);

    }

    @Override
    public void desactivar(Long id) {
        Servicio servicio = catalogoRepository.buscarPorId(id).orElseThrow(() -> new IllegalArgumentException("No existe el servicio com el id:" + id));
        servicio.setActivo(false);
        catalogoRepository.guardar(servicio);
    }
}
