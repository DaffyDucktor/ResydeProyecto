package pe.com.service;

import pe.com.model.Incidencia;
import pe.com.model.Mantenimiento;

import java.util.List;

public interface MantenimientoService {
    List<Mantenimiento> listAll();

    Mantenimiento listOne(Integer id);

    Mantenimiento insert (Mantenimiento obj);

    Mantenimiento update (Mantenimiento obj);

    void delete (Mantenimiento obj);
}
