package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Residente;
import pe.com.service.ResidenteService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/residente")
@CrossOrigin("http://localhost:4200/")
public class ResidenteController {

    private static final Logger logger = LoggerFactory.getLogger(ResidenteController.class);

    @Autowired
    ResidenteService residenteService;

    @GetMapping
    private List<Residente> listAll(){
        logger.info("Listando Residentes...");
        return residenteService.listAll();
    }

    @GetMapping("/{id}")
    private Residente listOne(@PathVariable Integer id){
        logger.info("Listando un Residente...");
        return residenteService.listOne(id);
    }

    @PostMapping
    private Residente insert(Residente obj){
        logger.info("Creando un Residente...");
        return residenteService.insert(obj);
    }

    @PutMapping
    private Residente update(Residente obj) {
        logger.info("Modificando un Residente...");
        return residenteService.update(obj);
    }

    @DeleteMapping
    private void delete(Residente obj){
        logger.info("Eliminando un Residente...");
        residenteService.delete(obj);
    }
}
