package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Incidencia;
import pe.com.service.IncidenciaService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/incidencia")
@CrossOrigin("http://localhost:4200/")
public class IncidenciaController {

    private static final Logger logger = LoggerFactory.getLogger(DepartamentoController.class);

    @Autowired
    IncidenciaService incidenciaService;

    @GetMapping
    private List<Incidencia> listAll(){
        logger.info("Listando Incidencias...");
        return incidenciaService.listAll();
    }

    @GetMapping("/{id}")
    private Incidencia listOne(@PathVariable Integer id){
        logger.info("Listando una Incidencia...");
        return incidenciaService.listOne(id);
    }

    @PostMapping
    private Incidencia insert(Incidencia obj){
        logger.info("Creando una Incidencia...");
        return incidenciaService.insert(obj);
    }

    @PutMapping
    private Incidencia update(Incidencia obj) {
        logger.info("Actualizando una Incidencia...");
        return incidenciaService.update(obj);
    }

    @DeleteMapping
    private void delete(Incidencia obj){
        logger.info("Eliminando una Incidencia...");
        incidenciaService.delete(obj);
    }
}
