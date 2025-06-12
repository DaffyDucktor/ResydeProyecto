package pe.com.service;

import pe.com.model.Mantenimiento;
import pe.com.model.Pago;
import pe.com.model.request.PagoRequest;

import java.util.List;

public interface PagoService {
    List<Pago> listAll();

    Pago listOne(Integer id);

    Pago insert (Pago obj);

    Pago update (Pago obj);

    void delete (Pago obj);

    Integer cargaMasiva (List<PagoRequest> obj);
}
