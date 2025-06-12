package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.EstadoRecibo;
import pe.com.repository.EstadoReciboRepository;
import pe.com.service.EstadoReciboService;

import java.util.List;

@Service
public class EstadoReciboServiceImpl implements EstadoReciboService {

    @Autowired
    EstadoReciboRepository estadoReciboRepository;

    @Override
    public List<EstadoRecibo> listAll() {
        return estadoReciboRepository.findAll();
    }

    @Override
    public EstadoRecibo listOne(Integer id) {
        return estadoReciboRepository.getById(id);
    }
}
