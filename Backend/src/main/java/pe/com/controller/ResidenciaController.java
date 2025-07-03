package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Residencia;
import pe.com.model.request.ResidenciaRequest;
import pe.com.service.ResidenciaService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/residencia")
@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class ResidenciaController {

    private static final Logger logger = LoggerFactory.getLogger(ResidenciaController.class);

    @Autowired
    ResidenciaService residenciaService;

    @GetMapping
    private List<Residencia> listAll(){
        logger.info("Listando Residencias...");
        List<Residencia> obj = residenciaService.listAll();
        logger.info("RESIDENCIAS: " + obj.toString());

        return obj;
    }

    @GetMapping("count")
    private long count(){
        logger.info("Contar departamentos...");
        return residenciaService.count();
    }

    @GetMapping("/{id}")
    private Residencia listOne(@PathVariable Integer id){
        logger.info("Listando un Residencia...");
        return residenciaService.listOne(id);
    }

    @PostMapping
    private Residencia insert(@RequestPart(value = "residencia") ResidenciaRequest obj){
        logger.info("Creando un Residencia...");
        logger.info("RESIDENCIA REQUEST: {}", obj.toString());

        return residenciaService.insert(obj);
    }

    @PutMapping
    private Residencia update(@RequestBody ResidenciaRequest obj) {
        logger.info("Modificando un Residencia...");
        return residenciaService.update(obj);
    }

    @DeleteMapping
    private void delete(@RequestBody ResidenciaRequest obj){
        logger.info("Eliminando un Residencia...");
        residenciaService.delete(obj);
    }

}
