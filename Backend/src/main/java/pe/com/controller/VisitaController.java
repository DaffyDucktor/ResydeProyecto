package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Visita;
import pe.com.service.VisitaService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/visita")
@CrossOrigin("http://localhost:4200/")
public class VisitaController {

    private static final Logger logger = LoggerFactory.getLogger(DepartamentoController.class);

    @Autowired
    VisitaService visitaService;
    
    @GetMapping
    private List<Visita> listAll(){
        logger.info("Listando visitas...");
        return visitaService.listAll();
    }

    @GetMapping("/{id}")
    private Visita listOne(@PathVariable Integer id){
        logger.info("Listando una Visita...");
        return visitaService.listOne(id);
    }

    @PostMapping
    private Visita insert(Visita obj){
        logger.info("Creando una Visita...");
        return visitaService.insert(obj);
    }

    @PutMapping
    private Visita update(Visita obj) {
        logger.info("Modificando una Visita...");
        return visitaService.update(obj);
    }

    @DeleteMapping
    private void delete(Visita obj){
        logger.info("Eliminando una Visita...");
        visitaService.delete(obj);
    }

}
