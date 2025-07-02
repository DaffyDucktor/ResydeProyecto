package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Rol;
import pe.com.repository.RolRepository;
import pe.com.service.RolService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
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
}
