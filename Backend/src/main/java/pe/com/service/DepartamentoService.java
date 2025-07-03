package pe.com.service;

import pe.com.model.Departamento;
import pe.com.model.request.DepartamentoRequest;

import java.util.List;

public interface DepartamentoService {

    List<Departamento> listAll();

    Departamento listOne(Integer id);

    Departamento insert (DepartamentoRequest depObj);

    Departamento update (DepartamentoRequest depObj);

    void delete (DepartamentoRequest depObj);

    long count();
}
