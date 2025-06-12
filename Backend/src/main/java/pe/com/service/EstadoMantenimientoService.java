package pe.com.service;

import pe.com.model.EstadoMantenimiento;

import java.util.List;

public interface EstadoMantenimientoService {

    List<EstadoMantenimiento> listAll();

    EstadoMantenimiento listOne(Integer id);

}
