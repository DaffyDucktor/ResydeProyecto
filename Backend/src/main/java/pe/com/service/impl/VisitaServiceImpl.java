package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Visita;
import pe.com.repository.VisitaRepository;
import pe.com.service.VisitaService;

import java.util.List;

@Service
public class VisitaServiceImpl implements VisitaService {

    @Autowired
    VisitaRepository visitaRepository;

    @Override
    public List<Visita> listAll() {
        return visitaRepository.findAll();
    }

    @Override
    public Visita listOne(Integer id) {
        return visitaRepository.getById(id);
    }

    @Override
    public Visita insert(Visita obj) {
        return visitaRepository.save(obj);
    }

    @Override
    public Visita update(Visita obj) {
        return visitaRepository.save(obj);
    }

    @Override
    public void delete(Visita obj) {
        visitaRepository.delete(obj);
    }
}
