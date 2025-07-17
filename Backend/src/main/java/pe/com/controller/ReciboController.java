package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Incidencia;
import pe.com.model.Recibo;
import pe.com.model.request.ReciboRequest;
import pe.com.service.ReciboService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/resyde/recibo")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class ReciboController {

    private static final Logger logger = LoggerFactory.getLogger(ReciboController.class);

    @Autowired
    ReciboService reciboService;

    @GetMapping
    private List<Recibo> listAll(){
        logger.info("Listando Recibos...");
        return reciboService.listAll();
    }

    @GetMapping("/count")
    private long count(){
        logger.info("Contar recibos...");
        return reciboService.count();
    }

    @GetMapping("/balance")
    private Double balance(){
        logger.info("Total de recibos...");
        return reciboService.balance();
    }

    @GetMapping("/listAllByResidencia/{idResidencia}")
    private List<Recibo> listAllByResidencia(@PathVariable(required = false) Integer idResidencia){
        logger.info("Listando recibos por la residencia...: {}", idResidencia);
        return reciboService.listAllByResidencia(idResidencia);
    }

    @GetMapping("/{id}")
    private Recibo listOne(@PathVariable Integer id){
        logger.info("Listando un Recibo...");
        return reciboService.listOne(id);
    }

    @PostMapping
    private Recibo insert(@RequestPart(value = "recibo")ReciboRequest obj){
        logger.info("RECIBO REQUEST: {}", obj.toString());

        if(Optional.ofNullable(obj.getId()).orElse("").isEmpty()){
            logger.info("Creando un Recibo...");
            return reciboService.insert(obj);
        } else {
            logger.info("Modificando un Recibo...");
            return reciboService.update(obj);
        }
    }

    @PutMapping
    private Recibo update(ReciboRequest obj) {
        logger.info("Modificando un Recibo...");
        return reciboService.update(obj);
    }

    @DeleteMapping
    private void delete(ReciboRequest obj){
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
