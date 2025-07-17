package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Incidencia;
import pe.com.model.Visita;
import pe.com.model.request.VisitaRequest;
import pe.com.service.VisitaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/resyde/visita")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class VisitaController {

    private static final Logger logger = LoggerFactory.getLogger(VisitaController.class);

    @Autowired
    VisitaService visitaService;
    
    @GetMapping
    private List<Visita> listAll(){
        logger.info("Listando visitas...");
        return visitaService.listAll();
    }

    @GetMapping("/listAllByResidencia/{idResidencia}")
    private List<Visita> listAllByResidencia(@PathVariable(required = false) Integer idResidencia){
        logger.info("Listando visitas por la residencia...: {}", idResidencia);
        return visitaService.listAllByResidencia(idResidencia);
    }

    @GetMapping("/{id}")
    private Visita listOne(@PathVariable Integer id){
        logger.info("Listando una Visita...");
        return visitaService.listOne(id);
    }

    @PostMapping
    private Visita insert(@RequestPart(value = "residente") VisitaRequest obj){
        logger.info("VISITA REQUEST: {}", obj.toString());

        if(Optional.ofNullable(obj.getId()).orElse("").isEmpty()){
            logger.info("Creando una Visita...");
            return visitaService.insert(obj);
        } else {
            logger.info("Modificando una Visita...");
            return visitaService.update(obj);
        }
    }

    @PutMapping
    private Visita update(VisitaRequest obj) {
        logger.info("Modificando una Visita...");
        return visitaService.update(obj);
    }

    @DeleteMapping
    private void delete(VisitaRequest obj){
        logger.info("Eliminando una Visita...");
        visitaService.delete(obj);
    }
}