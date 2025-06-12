package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Residencia;
import pe.com.repository.ResidenciaRepository;
import pe.com.service.ResidenciaService;

import java.util.List;

@Service
public class ResidenciaServiceImpl implements ResidenciaService {

    @Autowired
    ResidenciaRepository residenciaRepository;

    @Override
    public List<Residencia> listAll() {
        return residenciaRepository.findAll();
    }

    @Override
    public Residencia listOne(Integer id) {
        return residenciaRepository.getById(id);
    }

    @Override
    public Residencia insert(Residencia obj) {
        return residenciaRepository.save(obj);
    }

    @Override
    public Residencia update(Residencia obj) {
        return residenciaRepository.save(obj);
    }

    @Override
    public void delete(Residencia obj) {
        residenciaRepository.delete(obj);
    }
}
