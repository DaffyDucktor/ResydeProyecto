package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.EstadoMantenimiento;
import pe.com.model.Mantenimiento;
import pe.com.model.request.MantenimientoRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.EstadoMantenimientoRepository;
import pe.com.repository.MantenimientoRepository;
import pe.com.service.MantenimientoService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class MantenimientoServiceImpl implements MantenimientoService {

    @Autowired
    MantenimientoRepository mantenimientoRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Autowired
    EstadoMantenimientoRepository estadoMantenimientoRepository;

    @Override
    public List<Mantenimiento> listAll() {
        return mantenimientoRepository.findAll();
    }

    @Override
    public Mantenimiento listOne(Integer id) {
        return mantenimientoRepository.getById(id);
    }

    @Override
    public Mantenimiento insert(MantenimientoRequest obj) {
        Mantenimiento objMantenimiento = new Mantenimiento();

        objMantenimiento.setDescripcion(obj.getDescripcion());
        objMantenimiento.setFechaFin(obj.getFechaFin());
        objMantenimiento.setFechaIni(obj.getFechaIni());
        objMantenimiento.setUsuCreacion(obj.getUsuario());
        objMantenimiento.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));
        objMantenimiento.setIdEstadoMantenimiento(estadoMantenimientoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return mantenimientoRepository.save(objMantenimiento);
    }

    @Override
    public Mantenimiento update(MantenimientoRequest obj) {
        Mantenimiento objMantenimiento = new Mantenimiento();

        objMantenimiento.setId(Integer.parseInt(obj.getId()));
        objMantenimiento.setDescripcion(obj.getDescripcion());
        objMantenimiento.setFechaFin(obj.getFechaFin());
        objMantenimiento.setFechaIni(obj.getFechaIni());
        objMantenimiento.setUsuCreacion(obj.getUsuario());
        objMantenimiento.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));
        objMantenimiento.setIdEstadoMantenimiento(estadoMantenimientoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return mantenimientoRepository.save(objMantenimiento);
    }

    @Override
    public void delete(MantenimientoRequest obj) {
        mantenimientoRepository.deleteById(Integer.parseInt(obj.getId()));
    }

}
