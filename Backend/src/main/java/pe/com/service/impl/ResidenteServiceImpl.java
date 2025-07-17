package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Residente;
import pe.com.model.request.ResidenteRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.ResidenteRepository;
import pe.com.service.ResidenteService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class ResidenteServiceImpl implements ResidenteService {

    private static final Logger logger = LoggerFactory.getLogger(ResidenteServiceImpl.class);

    @Autowired
    ResidenteRepository residenteRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Override
    public List<Residente> listAll() {
        return residenteRepository.findAll();
    }

    @Override
    public List<Residente> listAllByResidencia(Integer idResidencia) {
        logger.info("IdResidencia: {}", idResidencia);
        return residenteRepository.getAllByResidencia(idResidencia);
    }

    @Override
    public Residente listOne(Integer id) {
        return residenteRepository.getById(id);
    }

    @Override
    public Residente insert(ResidenteRequest obj) {
        Residente objResidente = new Residente();

        objResidente.setApellido(obj.getApellido());
        objResidente.setNombre(obj.getNombre());
        objResidente.setTelefono(obj.getTelefono());
        objResidente.setCorreo(obj.getCorreo());
        objResidente.setUsuCreacion(obj.getUsuario());
        objResidente.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return residenteRepository.save(objResidente);
    }

    @Override
    public Residente update(ResidenteRequest obj) {
        Residente objResidente = new Residente();

        objResidente.setId(Integer.parseInt(obj.getId()));
        objResidente.setApellido(obj.getApellido());
        objResidente.setNombre(obj.getNombre());
        objResidente.setTelefono(obj.getTelefono());
        objResidente.setCorreo(obj.getCorreo());
        objResidente.setUsuModifica(obj.getUsuario());
        objResidente.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return residenteRepository.save(objResidente);
    }

    @Override
    public void delete(ResidenteRequest obj) {
         residenteRepository.deleteById(Integer.parseInt(obj.getId()));
    }

    @Override
    public long count() {
        return residenteRepository.count();
    }
}
