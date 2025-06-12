package pe.com.service;

import pe.com.model.EstadoDepartamento;
import pe.com.model.EstadoMantenimiento;

import java.util.List;

public interface EstadoDepartamentoService {

    List<EstadoDepartamento> listAll();

    EstadoDepartamento listOne(Integer id);

}
