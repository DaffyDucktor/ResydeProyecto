package pe.com.service;

import pe.com.model.Paquete;
import pe.com.model.Recibo;
import pe.com.model.request.ReciboRequest;

import java.util.List;

public interface ReciboService {
    List<Recibo> listAll();

    Recibo listOne(Integer id);

    Recibo insert (ReciboRequest obj);

    Recibo update (ReciboRequest obj);

    void delete (ReciboRequest obj);

    Integer creacionMasiva(String month, String year, String residence);

    void NetWorthExport();
}
