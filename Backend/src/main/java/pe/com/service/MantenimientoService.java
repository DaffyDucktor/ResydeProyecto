package pe.com.service;

import pe.com.model.Incidencia;
import pe.com.model.Mantenimiento;
import pe.com.model.request.MantenimientoRequest;

import java.util.List;

public interface MantenimientoService {
    List<Mantenimiento> listAll();

    Mantenimiento listOne(Integer id);

    Mantenimiento insert (MantenimientoRequest obj);

    Mantenimiento update (MantenimientoRequest obj);

    void delete (MantenimientoRequest obj);
}
