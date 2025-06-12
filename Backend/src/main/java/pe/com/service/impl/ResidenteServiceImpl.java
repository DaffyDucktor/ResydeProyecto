package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Residente;
import pe.com.repository.ResidenteRepository;
import pe.com.service.ResidenteService;

import java.util.List;

@Service
public class ResidenteServiceImpl implements ResidenteService {

    @Autowired
    ResidenteRepository residenteRepository;

    @Override
    public List<Residente> listAll() {
        return residenteRepository.findAll();
    }

    @Override
    public Residente listOne(Integer id) {
        return residenteRepository.getById(id);
    }

    @Override
    public Residente insert(Residente obj) {
        return residenteRepository.save(obj);
    }

    @Override
    public Residente update(Residente obj) {
        return residenteRepository.save(obj);
    }

    @Override
    public void delete(Residente obj) {
         residenteRepository.delete(obj);
    }
}
