package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.EstadoDepartamento;
import pe.com.service.EstadoDepartamentoService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/estadoDepartamento")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class EstadoDepartamentoController {

    private static final Logger logger = LoggerFactory.getLogger(EstadoDepartamentoController.class);

    @Autowired
    EstadoDepartamentoService estadoDepartamentoService;

    @GetMapping
    private List<EstadoDepartamento> listAll(){
        logger.info("Listando estados...");
        return estadoDepartamentoService.listAll();
    }

    @GetMapping("/{id}")
    private EstadoDepartamento listOne(@PathVariable Integer id){
        logger.info("Listando un estado...");
        return estadoDepartamentoService.listOne(id);
    }
}
