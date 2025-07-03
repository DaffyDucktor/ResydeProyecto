package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Pago;
import pe.com.model.request.PagoRequest;
import pe.com.service.PagoService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/pago")
@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class PagoController {

    private static final Logger logger = LoggerFactory.getLogger(PagoController.class);

    @Autowired
    PagoService pagoService;

    @GetMapping
    private List<Pago> listAll(){
        logger.info("Listando Pagos...");
        return pagoService.listAll();
    }

    @GetMapping("/count")
    private long count(){
        logger.info("Contar pagos...");
        return pagoService.count();
    }

    @GetMapping("/balance")
    private Double balance(){
        logger.info("Total de Pagos...");
        return pagoService.balance();
    }

    @GetMapping("/{id}")
    private Pago listOne(@PathVariable Integer id){
        logger.info("Listando un Pago...");
        return pagoService.listOne(id);
    }

    @PostMapping
    private Pago insert(PagoRequest obj){
        logger.info("Creando un Pago...");
        return pagoService.insert(obj);
    }

    @PutMapping
    private Pago update(PagoRequest obj) {
        logger.info("Modificando un Pago...");
        return pagoService.update(obj);
    }

    @DeleteMapping
    private void delete(PagoRequest obj){
        logger.info("Eliminando un Pago...");
        pagoService.delete(obj);
    }

    @PostMapping("/cargaMasiva")
    private Integer cargaMasiva(@RequestAttribute(name = "pagos")List<PagoRequest> objPagos){
        logger.info("Carga masiva de Pagos...");
        return pagoService.cargaMasiva(objPagos);
    }
}
