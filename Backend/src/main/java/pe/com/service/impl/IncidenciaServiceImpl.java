package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Incidencia;
import pe.com.model.request.IncidenciaRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.IncidenciaRepository;
import pe.com.service.IncidenciaService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class IncidenciaServiceImpl implements IncidenciaService {

    @Autowired
    IncidenciaRepository incidenciaRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Override
    public List<Incidencia> listAll() {
        return incidenciaRepository.findAll();
    }

    @Override
    public Incidencia listOne(Integer id) {
        return incidenciaRepository.getById(id);
    }

    @Override
    public Incidencia insert(IncidenciaRequest obj) {
        Incidencia objIncidencia = new Incidencia();

        objIncidencia.setDetalle(obj.getDetalle());
        objIncidencia.setVisible(obj.getVisible());
        objIncidencia.setFecha(obj.getFecha());
        objIncidencia.setHora(obj.getHora());
        objIncidencia.setUsuCreacion(obj.getUsuario());
        objIncidencia.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getId())));

        return incidenciaRepository.save(objIncidencia);
    }

    @Override
    public Incidencia update(IncidenciaRequest obj) {
        Incidencia objIncidencia = new Incidencia();

        objIncidencia.setId(Integer.parseInt(obj.getId()));
        objIncidencia.setDetalle(obj.getDetalle());
        objIncidencia.setVisible(obj.getVisible());
        objIncidencia.setFecha(obj.getFecha());
        objIncidencia.setHora(obj.getHora());
        objIncidencia.setUsuModifica(obj.getUsuario());
        objIncidencia.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getId())));

        return incidenciaRepository.save(objIncidencia);
    }

    @Override
    public void delete(IncidenciaRequest obj) {
        incidenciaRepository.deleteById(Integer.parseInt(obj.getId()));
    }
}
