package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Recibo;
import pe.com.service.ReciboService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/recibo")
@CrossOrigin("http://localhost:4200/")
public class ReciboController {

    private static final Logger logger = LoggerFactory.getLogger(ReciboController.class);

    @Autowired
    ReciboService reciboService;

    @GetMapping
    private List<Recibo> listAll(){
        logger.info("Listando Recibos...");
        return reciboService.listAll();
    }

    @GetMapping("/{id}")
    private Recibo listOne(@PathVariable Integer id){
        logger.info("Listando un Recibo...");
        return reciboService.listOne(id);
    }

    @PostMapping
    private Recibo insert(Recibo obj){
        logger.info("Creando un Recibo...");
        return reciboService.insert(obj);
    }

    @PutMapping
    private Recibo update(Recibo obj) {
        logger.info("Modificando un Recibo...");
        return reciboService.update(obj);
    }

    @DeleteMapping
    private void delete(Recibo obj){
        logger.info("Eliminando un Recibo...");
        reciboService.delete(obj);
    }

    @PostMapping("/reciboController")
    private Integer cargaMasiva(@RequestAttribute(name = "month")String month,
                                @RequestAttribute(name = "year")String year,
                                @RequestAttribute(name = "residence")String residence){
        logger.info("Realizando carga masiva de recibos...");
        return reciboService.creacionMasiva(month, year, residence);
    }
}
