package pe.com.service;

import pe.com.model.Paquete;
import pe.com.model.Recibo;

import java.util.List;

public interface ReciboService {
    List<Recibo> listAll();

    Recibo listOne(Integer id);

    Recibo insert (Recibo obj);

    Recibo update (Recibo obj);

    void delete (Recibo obj);

    Integer creacionMasiva(String month, String year, String residence);
}
