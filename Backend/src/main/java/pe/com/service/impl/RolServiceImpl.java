package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Rol;
import pe.com.repository.RolRepository;
import pe.com.service.RolService;

import java.util.List;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    RolRepository rolRepository;

    @Override
    public List<Rol> listAll() {
        return rolRepository.findAll();
    }

    @Override
    public Rol listOne(Integer id) {
        return rolRepository.getById(id);
    }

    @Override
    public Rol insert(Rol obj) {
        return rolRepository.save(obj);
    }

    @Override
    public Rol update(Rol obj) {
        return rolRepository.save(obj);
    }

    @Override
    public void delete(Rol obj) {
        rolRepository.delete(obj);
    }
}
