package pe.com.service;

import pe.com.model.Visita;

import java.util.List;

public interface VisitaService {

    List<Visita> listAll();

    Visita listOne(Integer id);

    Visita insert (Visita obj);

    Visita update (Visita obj);

    void delete (Visita obj);

}
