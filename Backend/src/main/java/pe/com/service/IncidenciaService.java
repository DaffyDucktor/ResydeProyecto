package pe.com.service;

import pe.com.model.EstadoPaquete;
import pe.com.model.Incidencia;
import pe.com.model.request.IncidenciaRequest;

import java.util.List;

public interface IncidenciaService {
    List<Incidencia> listAll();

    Incidencia listOne(Integer id);

    Incidencia insert (IncidenciaRequest obj);

    Incidencia update (IncidenciaRequest obj);

    void delete (IncidenciaRequest obj);
}
