package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Paquete;
import pe.com.model.request.PaqueteRequest;
import pe.com.service.PaqueteService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/paquete")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class PaqueteController {

    private static final Logger logger = LoggerFactory.getLogger(PaqueteController.class);

    @Autowired
    PaqueteService paqueteService;

    @GetMapping
    private List<Paquete> listAll(){
        logger.info("Listando Paquetes...");
        return paqueteService.listAll();
    }

    @GetMapping("/{id}")
    private Paquete listOne(@PathVariable Integer id){
        logger.info("Listando un Paquete...");
        return paqueteService.listOne(id);
    }

    @PostMapping
    private Paquete insert(PaqueteRequest obj){
        logger.info("Creando un Paquete...");
        return paqueteService.insert(obj);
    }

    @PutMapping
    private Paquete update(PaqueteRequest obj) {
        logger.info("Modificando un Paquete...");
        return paqueteService.update(obj);
    }

    @DeleteMapping
    private void delete(PaqueteRequest obj){
        logger.info("Eliminando un Paquete...");
        paqueteService.delete(obj);
    }
}
