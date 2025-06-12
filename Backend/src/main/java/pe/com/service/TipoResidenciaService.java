package pe.com.service;

import pe.com.model.TipoResidencia;

import java.util.List;

public interface TipoResidenciaService {

    List<TipoResidencia> listAll();

    TipoResidencia listOne(Integer id);

}
