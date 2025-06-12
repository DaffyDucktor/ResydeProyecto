package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Pago;
import pe.com.model.request.PagoRequest;
import pe.com.repository.PagoRepository;
import pe.com.service.PagoService;

import java.util.List;

@Service
public class PagoServiceImpl implements PagoService {

    private static final Logger log = LoggerFactory.getLogger(PagoServiceImpl.class);
    @Autowired
    PagoRepository pagoRepository;

    @Override
    public List<Pago> listAll() {
        return pagoRepository.findAll();
    }

    @Override
    public Pago listOne(Integer id) {
        return pagoRepository.getById(id);
    }

    @Override
    public Pago insert(Pago obj) {
        return pagoRepository.save(obj);
    }

    @Override
    public Pago update(Pago obj) {
        return pagoRepository.save(obj);
    }

    @Override
    public void delete(Pago obj) {
        pagoRepository.delete(obj);
    }

    @Override
    public Integer cargaMasiva(List<PagoRequest> obj) {

        obj.forEach(pagoRequest -> {
            log.info(obj.toString());

        });

        return 0;
    }
}
