package pe.com.service;

import pe.com.model.Visita;
import pe.com.model.request.VisitaRequest;

import java.util.List;

public interface VisitaService {

    List<Visita> listAll();

    Visita listOne(Integer id);

    Visita insert (VisitaRequest obj);

    Visita update (VisitaRequest obj);

    void delete (VisitaRequest obj);

}
