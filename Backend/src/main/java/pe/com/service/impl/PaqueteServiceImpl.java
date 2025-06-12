package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Paquete;
import pe.com.repository.PaqueteRepository;
import pe.com.service.PaqueteService;

import java.util.List;

@Service
public class PaqueteServiceImpl implements PaqueteService {

    @Autowired
    PaqueteRepository paqueteRepository;

    @Override
    public List<Paquete> listAll() {
        return paqueteRepository.findAll();
    }

    @Override
    public Paquete listOne(Integer id) {
        return paqueteRepository.getById(id);
    }

    @Override
    public Paquete insert(Paquete obj) {
        return paqueteRepository.save(obj);
    }

    @Override
    public Paquete update(Paquete obj) {
        return paqueteRepository.save(obj);
    }

    @Override
    public void delete(Paquete obj) {
        paqueteRepository.delete(obj);
    }
}
