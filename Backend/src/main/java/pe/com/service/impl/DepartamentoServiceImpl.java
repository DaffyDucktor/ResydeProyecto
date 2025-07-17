package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.controller.DepartamentoController;
import pe.com.model.Departamento;
import pe.com.model.Residencia;
import pe.com.model.request.DepartamentoRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.EstadoDepartamentoRepository;
import pe.com.repository.ResidenciaRepository;
import pe.com.service.DepartamentoService;

import java.util.ArrayList;
import java.util.List;

@Service
@SuppressWarnings({"deprecation", "unused"})
public class DepartamentoServiceImpl implements DepartamentoService {

    private static final Logger logger = LoggerFactory.getLogger(DepartamentoServiceImpl.class);

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Autowired
    ResidenciaRepository residenciaRepository;

    @Autowired
    EstadoDepartamentoRepository estadoDepartamentoRepository;

    @Override
    public List<Departamento> listAll() {
        return departamentoRepository.findAll();
    }

    @Override
    public List<Departamento> listAllByResidencia(Integer idResidencia) {
        logger.info("IDResidencia: {}", idResidencia);
        return departamentoRepository.getAllByResidencia(idResidencia);
    }


    @Override
    public Departamento listOne(Integer id) {
        return departamentoRepository.getById(id);
    }

    @Override
    public List<Departamento> insertAll(String idResidencia) {
        Residencia obj = residenciaRepository.getById(Integer.parseInt(idResidencia));

        List<Departamento> depList = new ArrayList<>();
        for (int i = 0; i < Integer.parseInt(obj.getNDepartamento()); i++) {
            Departamento objDep = new Departamento();
            objDep.setIdResidencia(obj);
            objDep.setIdEstadoDepartamento(estadoDepartamentoRepository.getById(1));
            objDep.setUsuCreacion("Admin");
            depList.add(objDep);
        }
        return departamentoRepository.saveAll(depList);

    }

    @Override
    public Departamento insert(DepartamentoRequest depObj) {
        Departamento objDepartamento = new Departamento();

        objDepartamento.setCodigo(depObj.getCodigo());
        objDepartamento.setIdResidencia(residenciaRepository.getById(Integer.parseInt(depObj.getIdResidencia())));
        objDepartamento.setIdEstadoDepartamento(estadoDepartamentoRepository.getById(Integer.parseInt(depObj.getIdEstadoDepartamento())));
        objDepartamento.setUsuCreacion(depObj.getUsuario());
        return departamentoRepository.save(objDepartamento);
    }

    @Override
    public Departamento update(DepartamentoRequest depObj) {
        Departamento objDepartamento = new Departamento();

        objDepartamento.setId(Integer.parseInt(depObj.getId()));
        objDepartamento.setCodigo(depObj.getCodigo());
        objDepartamento.setIdResidencia(residenciaRepository.getById(Integer.parseInt(depObj.getIdResidencia())));
        objDepartamento.setIdEstadoDepartamento(estadoDepartamentoRepository.getById(Integer.parseInt(depObj.getIdEstadoDepartamento())));
        objDepartamento.setUsuModifica(depObj.getUsuario());

        return departamentoRepository.save(objDepartamento);
    }

    @Override
    public void delete(DepartamentoRequest depObj) {
        departamentoRepository.deleteById(Integer.parseInt(depObj.getId()));
    }

    @Override
    public long count() {
        return departamentoRepository.count();
    }
}
