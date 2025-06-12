package pe.com.service;

import pe.com.model.EstadoPaquete;

import java.util.List;

public interface EstadoPaqueteService {

    List<EstadoPaquete> listAll();

    EstadoPaquete listOne(Integer id);

}
