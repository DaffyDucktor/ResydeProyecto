package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Departamento;
import pe.com.model.request.DepartamentoRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.EstadoDepartamentoRepository;
import pe.com.repository.ResidenciaRepository;
import pe.com.service.DepartamentoService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class DepartamentoServiceImpl implements DepartamentoService {

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
    public Departamento listOne(Integer id) {
        return departamentoRepository.getById(id);
    }

    @Override
    public Departamento insert(DepartamentoRequest depObj) {
        Departamento objDepartamento = new Departamento();

        objDepartamento.setCodigo(depObj.getCodigo());
        objDepartamento.setIdResidencia(residenciaRepository.getById(Integer.parseInt(depObj.getIdResidencia())));
        objDepartamento.setIdEstadoDepartamento(estadoDepartamentoRepository.getById(Integer.parseInt(depObj.getIdEstadoDepartamento())));
        objDepartamento.setUsuCreacion(depObj.getUsuCreacion());
        return departamentoRepository.save(objDepartamento);
    }

    @Override
    public Departamento update(DepartamentoRequest depObj) {
        Departamento objDepartamento = new Departamento();

        objDepartamento.setId(Integer.parseInt(depObj.getId()));
        objDepartamento.setCodigo(depObj.getCodigo());
        objDepartamento.setIdResidencia(residenciaRepository.getById(Integer.parseInt(depObj.getIdResidencia())));
        objDepartamento.setIdEstadoDepartamento(estadoDepartamentoRepository.getById(Integer.parseInt(depObj.getIdEstadoDepartamento())));
        objDepartamento.setFecModifica("");
        objDepartamento.setUsuModifica(depObj.getUsuCreacion());

        return departamentoRepository.save(objDepartamento);
    }

    @Override
    public void delete(DepartamentoRequest depObj) {
        departamentoRepository.deleteById(Integer.parseInt(depObj.getId()));
    }
}
