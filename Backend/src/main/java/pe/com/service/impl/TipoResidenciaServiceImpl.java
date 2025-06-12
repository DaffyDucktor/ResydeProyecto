package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.TipoResidencia;
import pe.com.repository.TipoResidenciaRepository;
import pe.com.service.TipoResidenciaService;

import java.util.List;

@Service
public class TipoResidenciaServiceImpl implements TipoResidenciaService {

    @Autowired
    TipoResidenciaRepository tipoResidenciaRepository;

    @Override
    public List<TipoResidencia> listAll() {
        return tipoResidenciaRepository.findAll();
    }

    @Override
    public TipoResidencia listOne(Integer id) {
        return tipoResidenciaRepository.getById(id);
    }
}
