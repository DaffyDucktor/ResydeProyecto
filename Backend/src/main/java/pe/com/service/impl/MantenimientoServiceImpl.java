package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Mantenimiento;
import pe.com.repository.MantenimientoRepository;
import pe.com.service.MantenimientoService;

import java.util.List;

@Service
public class MantenimientoServiceImpl implements MantenimientoService {

    @Autowired
    MantenimientoRepository mantenimientoRepository;

    @Override
    public List<Mantenimiento> listAll() {
        return mantenimientoRepository.findAll();
    }

    @Override
    public Mantenimiento listOne(Integer id) {
        return mantenimientoRepository.getById(id);
    }

    @Override
    public Mantenimiento insert(Mantenimiento obj) {
        return mantenimientoRepository.save(obj);
    }

    @Override
    public Mantenimiento update(Mantenimiento obj) {
        return mantenimientoRepository.save(obj);
    }

    @Override
    public void delete(Mantenimiento obj) {
        mantenimientoRepository.delete(obj);
    }
}
