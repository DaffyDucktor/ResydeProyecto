package pe.com.service;

import pe.com.model.Pago;
import pe.com.model.request.PagoRequest;

import java.util.List;

public interface PagoService {
    List<Pago> listAll();

    Pago listOne(Integer id);

    Pago insert (PagoRequest obj);

    Pago update (PagoRequest obj);

    void delete (PagoRequest obj);

    Integer cargaMasiva (List<PagoRequest> obj);

    void NetWorthExport();

    long count();

    Double balance();
}
