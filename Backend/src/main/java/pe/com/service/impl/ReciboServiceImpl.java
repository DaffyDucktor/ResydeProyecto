package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Recibo;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.ReciboRepository;
import pe.com.service.ReciboService;

import java.util.List;

@Service
public class ReciboServiceImpl implements ReciboService {

    private static final Logger log = LoggerFactory.getLogger(ReciboServiceImpl.class);
    @Autowired
    ReciboRepository reciboRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Override
    public List<Recibo> listAll() {
        return reciboRepository.findAll();
    }

    @Override
    public Recibo listOne(Integer id) {
        return reciboRepository.getById(id);
    }

    @Override
    public Recibo insert(Recibo obj) {
        return reciboRepository.save(obj);
    }

    @Override
    public Recibo update(Recibo obj) {
        return reciboRepository.save(obj);
    }

    @Override
    public void delete(Recibo obj) {
        reciboRepository.delete(obj);
    }

    @Override
    public Integer creacionMasiva(String month, String year, String residence) {

        List<String> objCodigos = departamentoRepository.getAllCodigo(residence);

        objCodigos.forEach(s -> {
            log.info(s);
        });

        return null;
    }
}
