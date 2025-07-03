package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Visita;
import pe.com.model.request.VisitaRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.VisitaRepository;
import pe.com.service.VisitaService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class VisitaServiceImpl implements VisitaService {

    @Autowired
    VisitaRepository visitaRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Override
    public List<Visita> listAll() {
        return visitaRepository.findAll();
    }

    @Override
    public Visita listOne(Integer id) {
        return visitaRepository.getById(id);
    }

    @Override
    public Visita insert(VisitaRequest obj) {
        Visita objVisita = new Visita();

        objVisita.setName(obj.getName());
        objVisita.setNDocumentacion(obj.getNDocumentacion());
        objVisita.setComentario(obj.getComentario());
        objVisita.setVisible(obj.getVisible());
        objVisita.setFecha(obj.getFecha());
        objVisita.setHora(obj.getHora());
        objVisita.setUsuCreacion(obj.getUsuario());
        objVisita.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return visitaRepository.save(objVisita);
    }

    @Override
    public Visita update(VisitaRequest obj) {
        Visita objVisita = new Visita();

        objVisita.setId(Integer.parseInt(obj.getId()));
        objVisita.setName(obj.getName());
        objVisita.setNDocumentacion(obj.getNDocumentacion());
        objVisita.setComentario(obj.getComentario());
        objVisita.setVisible(obj.getVisible());
        objVisita.setFecha(obj.getFecha());
        objVisita.setHora(obj.getHora());
        objVisita.setFecModifica(obj.getUsuario());
        objVisita.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return visitaRepository.save(objVisita);
    }

    @Override
    public void delete(VisitaRequest obj) {
        visitaRepository.deleteById(Integer.parseInt(obj.getId()));
    }
}

