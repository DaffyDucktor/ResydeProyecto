package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.EstadoDepartamento;
import pe.com.model.EstadoMantenimiento;
import pe.com.service.EstadoDepartamentoService;
import pe.com.service.EstadoMantenimientoService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/estadoMantenimiento")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class EstadoMantenimientoController {

    private static final Logger logger = LoggerFactory.getLogger(EstadoMantenimientoController.class);

    @Autowired
    EstadoMantenimientoService estadoMantenimientoService;

    @GetMapping
    private List<EstadoMantenimiento> listAll(){
        logger.info("Listando estados...");
        return estadoMantenimientoService.listAll();
    }

    @GetMapping("/{id}")
    private EstadoMantenimiento listOne(@PathVariable Integer id){
        logger.info("Listando un estado...");
        return estadoMantenimientoService.listOne(id);
    }
}
