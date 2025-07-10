package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Residencia;
import pe.com.model.request.ResidenciaRequest;
import pe.com.repository.ResidenciaRepository;
import pe.com.repository.TipoResidenciaRepository;
import pe.com.service.ResidenciaService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class ResidenciaServiceImpl implements ResidenciaService {

    @Autowired
    ResidenciaRepository residenciaRepository;

    @Autowired
    TipoResidenciaRepository tipoResidenciaRepository;

    @Override
    public List<Residencia> listAll() {
        return residenciaRepository.findAll();
    }

    @Override
    public Residencia listOne(Integer id) {
        return residenciaRepository.findById(id).get();
    }

    @Override
    public Residencia insert(ResidenciaRequest obj) {
        Residencia objResidencia = new Residencia();

        objResidencia.setNombre(obj.getNombre());
        objResidencia.setDireccion(obj.getDireccion());
        objResidencia.setNDepartamento(obj.getNDepartamento());
        objResidencia.setNEdificio(obj.getNEdificio());
        objResidencia.setUsuCreacion(obj.getUsuario());
        objResidencia.setIdTipoResidencia(tipoResidenciaRepository.findById(Integer.parseInt(obj.getIdTipoResidencia())).get());

        return residenciaRepository.save(objResidencia);
    }

    @Override
    public Residencia update(ResidenciaRequest obj) {
        Residencia objResidencia = residenciaRepository.findById(Integer.parseInt(obj.getId())).get();

        objResidencia.setId(Integer.parseInt(obj.getId()));
        objResidencia.setNombre(obj.getNombre());
        objResidencia.setDireccion(obj.getDireccion());
        objResidencia.setNDepartamento(obj.getNDepartamento());
        objResidencia.setNEdificio(obj.getNEdificio());
        objResidencia.setUsuModifica(obj.getUsuario());
        objResidencia.setIdTipoResidencia(tipoResidenciaRepository.findById(Integer.parseInt(obj.getIdTipoResidencia())).get());

        return residenciaRepository.save(objResidencia);
    }

    @Override
    public void delete(ResidenciaRequest obj) {
        residenciaRepository.deleteById(Integer.parseInt(obj.getId()));
    }

    @Override
    public long count() {
        return residenciaRepository.count();
    }
}
