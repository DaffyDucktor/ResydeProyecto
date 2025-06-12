package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Incidencia;
import pe.com.repository.IncidenciaRepository;
import pe.com.service.IncidenciaService;

import java.util.List;

@Service
public class IncidenciaServiceImpl implements IncidenciaService {

    @Autowired
    IncidenciaRepository incidenciaRepository;

    @Override
    public List<Incidencia> listAll() {
        return incidenciaRepository.findAll();
    }

    @Override
    public Incidencia listOne(Integer id) {
        return incidenciaRepository.getById(id);
    }

    @Override
    public Incidencia insert(Incidencia obj) {
        return incidenciaRepository.save(obj);
    }

    @Override
    public Incidencia update(Incidencia obj) {
        return incidenciaRepository.save(obj);
    }

    @Override
    public void delete(Incidencia obj) {
        incidenciaRepository.delete(obj);
    }
}
