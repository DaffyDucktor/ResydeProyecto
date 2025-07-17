package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Paquete;
import pe.com.model.request.PaqueteRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.EstadoPaqueteRepository;
import pe.com.repository.PaqueteRepository;
import pe.com.service.PaqueteService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class PaqueteServiceImpl implements PaqueteService {

    private static final Logger logger = LoggerFactory.getLogger(PaqueteServiceImpl.class);

    @Autowired
    PaqueteRepository paqueteRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Autowired
    EstadoPaqueteRepository estadoPaqueteRepository;

    @Override
    public List<Paquete> listAll() {
        return paqueteRepository.findAll();
    }

    @Override
    public List<Paquete> listAllByResidencia(Integer idResidencia) {
        logger.info("IdResidencia: {}", idResidencia);
        return paqueteRepository.getAllByResidencia(idResidencia);
    }

    @Override
    public Paquete listOne(Integer id) {
        return paqueteRepository.getById(id);
    }

    @Override
    public Paquete insert(PaqueteRequest obj) {
        Paquete objPaquete = new Paquete();

        objPaquete.setRemitente(obj.getRemitente());
        objPaquete.setDescripcion(obj.getDescripcion());
        objPaquete.setFecha(obj.getFecha());
        objPaquete.setHora(obj.getHora());
        objPaquete.setCodigo(obj.getCodigo());
        objPaquete.setUsuCreacion(obj.getUsuario());
        objPaquete.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));
        objPaquete.setIdEstadoPaquete(estadoPaqueteRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return paqueteRepository.save(objPaquete);
    }

    @Override
    public Paquete update(PaqueteRequest obj) {
        Paquete objPaquete = new Paquete();

        objPaquete.setId(Integer.parseInt(obj.getId()));
        objPaquete.setRemitente(obj.getRemitente());
        objPaquete.setDescripcion(obj.getDescripcion());
        objPaquete.setFecha(obj.getFecha());
        objPaquete.setHora(obj.getHora());
        objPaquete.setCodigo(obj.getCodigo());
        objPaquete.setUsuModifica(obj.getUsuario());
        objPaquete.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));
        objPaquete.setIdEstadoPaquete(estadoPaqueteRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return paqueteRepository.save(objPaquete);
    }

    @Override
    public void delete(PaqueteRequest obj) {
        paqueteRepository.deleteById(Integer.parseInt(obj.getId()));
    }
}
