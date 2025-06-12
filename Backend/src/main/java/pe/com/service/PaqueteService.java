package pe.com.service;

import pe.com.model.Pago;
import pe.com.model.Paquete;

import java.util.List;

public interface PaqueteService {
    List<Paquete> listAll();

    Paquete listOne(Integer id);

    Paquete insert (Paquete obj);

    Paquete update (Paquete obj);

    void delete (Paquete obj);
}
