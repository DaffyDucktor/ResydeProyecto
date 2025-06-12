package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.EstadoMantenimiento;
import pe.com.repository.EstadoMantenimientoRepository;
import pe.com.service.EstadoMantenimientoService;

import java.util.List;

@Service
public class EstadoMantenimientoServiceImpl implements EstadoMantenimientoService {

    @Autowired
    EstadoMantenimientoRepository estadoMantenimientoRepository;

    @Override
    public List<EstadoMantenimiento> listAll() {
        return estadoMantenimientoRepository.findAll();
    }

    @Override
    public EstadoMantenimiento listOne(Integer id) {
        return estadoMantenimientoRepository.getById(id);
    }
}
