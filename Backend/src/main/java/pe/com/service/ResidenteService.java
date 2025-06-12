package pe.com.service;

import pe.com.model.Residencia;
import pe.com.model.Residente;

import java.util.List;

public interface ResidenteService {
    List<Residente> listAll();

    Residente listOne(Integer id);

    Residente insert (Residente obj);

    Residente update (Residente obj);

    void delete (Residente obj);
}
