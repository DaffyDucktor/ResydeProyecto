package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.EstadoMantenimiento;
import pe.com.model.Incidencia;
import pe.com.model.Mantenimiento;
import pe.com.model.request.MantenimientoRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.EstadoMantenimientoRepository;
import pe.com.repository.MantenimientoRepository;
import pe.com.repository.ResidenciaRepository;
import pe.com.service.MantenimientoService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class MantenimientoServiceImpl implements MantenimientoService {

    private static final Logger logger = LoggerFactory.getLogger(MantenimientoServiceImpl.class);

    @Autowired
    MantenimientoRepository mantenimientoRepository;

    @Autowired
    ResidenciaRepository residenciaRepository;

    @Autowired
    EstadoMantenimientoRepository estadoMantenimientoRepository;

    @Override
    public List<Mantenimiento> listAll() {
        return mantenimientoRepository.findAll();
    }

    @Override
    public List<Mantenimiento> listAllByResidencia(Integer idResidencia) {
        logger.info("IdResidencia: {}", idResidencia);
        return mantenimientoRepository.getAllByResidencia(idResidencia);
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
        objMantenimiento.setIdResidencia(residenciaRepository.getById(Integer.parseInt(obj.getIdResidencia())));
        objMantenimiento.setIdEstadoMantenimiento(estadoMantenimientoRepository.getById(Integer.parseInt(obj.getIdEstadoMantenimiento())));

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
        objMantenimiento.setIdResidencia(residenciaRepository.getById(Integer.parseInt(obj.getIdResidencia())));
        objMantenimiento.setIdEstadoMantenimiento(estadoMantenimientoRepository.getById(Integer.parseInt(obj.getIdEstadoMantenimiento())));

        return mantenimientoRepository.save(objMantenimiento);
    }

    @Override
    public void delete(MantenimientoRequest obj) {
        mantenimientoRepository.deleteById(Integer.parseInt(obj.getId()));
    }

}
