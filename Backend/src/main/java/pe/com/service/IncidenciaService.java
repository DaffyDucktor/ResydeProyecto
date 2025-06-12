package pe.com.service;

import pe.com.model.EstadoPaquete;
import pe.com.model.Incidencia;

import java.util.List;

public interface IncidenciaService {
    List<Incidencia> listAll();

    Incidencia listOne(Integer id);

    Incidencia insert (Incidencia obj);

    Incidencia update (Incidencia obj);

    void delete (Incidencia obj);
}
