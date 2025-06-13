package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Mantenimiento;
import pe.com.service.MantenimientoService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/mantenimiento")
@CrossOrigin("http://localhost:4200/")
public class MantenimientoController {

    private static final Logger logger = LoggerFactory.getLogger(MantenimientoController.class);

    @Autowired
    MantenimientoService mantenimientoService;

    @GetMapping
    private List<Mantenimiento> listAll(){
        logger.info("Listando Mantenimientos...");
        return mantenimientoService.listAll();
    }

    @GetMapping("/{id}")
    private Mantenimiento listOne(@PathVariable Integer id){
        logger.info("Listando un Mantenimiento...");
        return mantenimientoService.listOne(id);
    }

    @PostMapping
    private Mantenimiento insert(Mantenimiento obj){
        logger.info("Creando un Mantenimiento...");
        return mantenimientoService.insert(obj);
    }

    @PutMapping
    private Mantenimiento update(Mantenimiento obj) {
        logger.info("Modificando un Mantenimiento...");
        return mantenimientoService.update(obj);
    }

    @DeleteMapping
    private void delete(Mantenimiento obj){
        logger.info("Eliminando un Mantenimiento...");
        mantenimientoService.delete(obj);
    }
}
