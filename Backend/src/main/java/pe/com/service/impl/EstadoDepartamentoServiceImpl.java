package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.EstadoDepartamento;
import pe.com.repository.EstadoDepartamentoRepository;
import pe.com.service.EstadoDepartamentoService;

import java.util.List;

@Service
public class EstadoDepartamentoServiceImpl implements EstadoDepartamentoService {

    @Autowired
    EstadoDepartamentoRepository departamentoRepository;

    @Override
    public List<EstadoDepartamento> listAll() {
        return departamentoRepository.findAll();
    }

    @Override
    public EstadoDepartamento listOne(Integer id) {
        return departamentoRepository.getById(id);
    }
}
