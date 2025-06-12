package pe.com.service;

import pe.com.model.EstadoRecibo;
import pe.com.model.TipoResidencia;

import java.util.List;

public interface EstadoReciboService {

    List<EstadoRecibo> listAll();

    EstadoRecibo listOne(Integer id);

}
