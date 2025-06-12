package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Departamento;
import pe.com.repository.DepartamentoRepository;
import pe.com.service.DepartamentoService;

import java.util.List;

@Service
public class DepartamentoServiceImpl implements DepartamentoService {

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Override
    public List<Departamento> listAll() {
        return departamentoRepository.findAll();
    }

    @Override
    public Departamento listOne(Integer id) {
        return departamentoRepository.getById(id);
    }

    @Override
    public Departamento insert(Departamento depObj) {
        return departamentoRepository.save(depObj);
    }

    @Override
    public Departamento update(Departamento depObj) {
        return departamentoRepository.save(depObj);
    }

    @Override
    public void delete(Departamento depObj) {
        departamentoRepository.delete(depObj);
    }
}
