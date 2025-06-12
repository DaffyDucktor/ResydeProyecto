package pe.com.service;

import pe.com.model.Departamento;

import java.util.List;

public interface DepartamentoService {

    List<Departamento> listAll();

    Departamento listOne(Integer id);

    Departamento insert (Departamento depObj);

    Departamento update (Departamento depObj);

    void delete (Departamento depObj);
}
