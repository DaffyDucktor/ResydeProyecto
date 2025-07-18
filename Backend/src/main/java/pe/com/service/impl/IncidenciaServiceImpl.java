package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Departamento;
import pe.com.model.Incidencia;
import pe.com.model.request.IncidenciaRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.IncidenciaRepository;
import pe.com.repository.ResidenciaRepository;
import pe.com.service.IncidenciaService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class IncidenciaServiceImpl implements IncidenciaService {

    private static final Logger logger = LoggerFactory.getLogger(IncidenciaServiceImpl.class);

    @Autowired
    IncidenciaRepository incidenciaRepository;

    @Autowired
    ResidenciaRepository residenciaRepository;

    @Override
    public List<Incidencia> listAll() {
        return incidenciaRepository.findAll();
    }

    @Override
    public List<Incidencia> listAllByResidencia(Integer idResidencia) {
        logger.info("IdResidencia: {}", idResidencia);
        return incidenciaRepository.getAllByResidencia(idResidencia);
    }

    @Override
    public Incidencia listOne(Integer id) {
        Incidencia obj = incidenciaRepository.getById(id);
        logger.info("INCIDENCIA REQUEST: {}", obj.toString());

        return obj;
    }

    @Override
    public Incidencia insert(IncidenciaRequest obj) {
        Incidencia objIncidencia = new Incidencia();

        objIncidencia.setDetalle(obj.getDetalle());
        objIncidencia.setFecha(obj.getFecha());
        objIncidencia.setHora(obj.getHora());
        objIncidencia.setUsuCreacion(obj.getUsuario());
        objIncidencia.setIdResidencia(residenciaRepository.getById(Integer.parseInt(obj.getIdResidencia())));

        return incidenciaRepository.save(objIncidencia);
    }

    @Override
    public Incidencia update(IncidenciaRequest obj) {
        Incidencia objIncidencia = new Incidencia();

        objIncidencia.setId(Integer.parseInt(obj.getId()));
        objIncidencia.setDetalle(obj.getDetalle());
        objIncidencia.setFecha(obj.getFecha());
        objIncidencia.setHora(obj.getHora());
        objIncidencia.setUsuModifica(obj.getUsuario());
        objIncidencia.setIdResidencia(residenciaRepository.getById(Integer.parseInt(obj.getIdResidencia())));

        return incidenciaRepository.save(objIncidencia);
    }

    @Override
    public void delete(IncidenciaRequest obj) {
        incidenciaRepository.deleteById(Integer.parseInt(obj.getId()));
    }
}
