package pe.com.service;

import pe.com.model.Recibo;
import pe.com.model.Residencia;

import java.util.List;

public interface ResidenciaService {
    List<Residencia> listAll();

    Residencia listOne(Integer id);

    Residencia insert (Residencia obj);

    Residencia update (Residencia obj);

    void delete (Residencia obj);
}
