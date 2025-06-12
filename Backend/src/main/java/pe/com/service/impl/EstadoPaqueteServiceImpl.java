package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.EstadoPaquete;
import pe.com.repository.EstadoPaqueteRepository;
import pe.com.service.EstadoPaqueteService;

import java.util.List;

@Service
public class EstadoPaqueteServiceImpl implements EstadoPaqueteService {

    @Autowired
    EstadoPaqueteRepository estadoPaqueteRepository;

    @Override
    public List<EstadoPaquete> listAll() {
        return estadoPaqueteRepository.findAll();
    }

    @Override
    public EstadoPaquete listOne(Integer id) {
        return estadoPaqueteRepository.getById(id);
    }
}
