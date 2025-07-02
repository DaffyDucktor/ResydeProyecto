package pe.com.service;

import pe.com.model.Pago;
import pe.com.model.Paquete;
import pe.com.model.request.PaqueteRequest;

import java.util.List;

public interface PaqueteService {
    List<Paquete> listAll();

    Paquete listOne(Integer id);

    Paquete insert (PaqueteRequest obj);

    Paquete update (PaqueteRequest obj);

    void delete (PaqueteRequest obj);
}
