package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Departamento;
import pe.com.model.Incidencia;
import pe.com.model.request.IncidenciaRequest;
import pe.com.service.IncidenciaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/resyde/incidencia")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class IncidenciaController {

    private static final Logger logger = LoggerFactory.getLogger(IncidenciaController.class);

    @Autowired
    IncidenciaService incidenciaService;

    @GetMapping
    private List<Incidencia> listAll(){
        logger.info("Listando Incidencias...");
        return incidenciaService.listAll();
    }

    @GetMapping("/listAllByResidencia/{idResidencia}")
    private List<Incidencia> listAllByResidencia(@PathVariable(required = false) Integer idResidencia){
        logger.info("Listando incidencias por la residencia...: {}", idResidencia);
        return incidenciaService.listAllByResidencia(idResidencia);
    }

    @GetMapping("/{id}")
    private Incidencia listOne(@PathVariable Integer id){
        logger.info("Listando una Incidencia...");
        return incidenciaService.listOne(id);
    }

    @PostMapping
    private Incidencia insert(@RequestPart(value = "incidencia")IncidenciaRequest obj){
        logger.info("INCIDENCIA REQUEST: {}", obj.toString());

        if(Optional.ofNullable(obj.getId()).orElse("").isEmpty()){
            logger.info("Creando una Incidencia...");
            return incidenciaService.insert(obj);
        } else {
            logger.info("Modificando una Incidencia...");
            return incidenciaService.update(obj);
        }
    }

    @PutMapping
    private Incidencia update(IncidenciaRequest obj) {
        logger.info("Actualizando una Incidencia...");
        return incidenciaService.update(obj);
    }

    @DeleteMapping
    private void delete(IncidenciaRequest obj){
        logger.info("Eliminando una Incidencia...");
        incidenciaService.delete(obj);
    }
}
