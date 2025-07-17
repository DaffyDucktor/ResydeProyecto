package pe.com.service;

import pe.com.model.Residencia;
import pe.com.model.Residente;
import pe.com.model.request.ResidenteRequest;

import java.util.List;

public interface ResidenteService {
    List<Residente> listAll();

    List<Residente> listAllByResidencia(Integer idResidencia);

    Residente listOne(Integer id);

    Residente insert (ResidenteRequest obj);

    Residente update (ResidenteRequest obj);

    void delete (ResidenteRequest obj);

    long count();
}
