package pe.com.service;

import pe.com.model.Recibo;
import pe.com.model.Residencia;
import pe.com.model.request.ResidenciaRequest;

import java.util.List;

public interface ResidenciaService {
    List<Residencia> listAll();

    Residencia listOne(Integer id);

    Residencia insert (ResidenciaRequest obj);

    Residencia update (ResidenciaRequest obj);

    void delete (ResidenciaRequest obj);

    long count();
}
