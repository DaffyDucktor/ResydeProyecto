package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.EstadoPaquete;
import pe.com.service.EstadoPaqueteService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/estadoPaquete")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class EstadoPaqueteController {

    private static final Logger logger = LoggerFactory.getLogger(EstadoPaqueteController.class);

    @Autowired
    EstadoPaqueteService estadoPaqueteService;

    @GetMapping
    private List<EstadoPaquete> listAll(){
        logger.info("Listando estados...");
        return estadoPaqueteService.listAll();
    }

    @GetMapping("/{id}")
    private EstadoPaquete listOne(@PathVariable Integer id){
        logger.info("Listando un estado...");
        return estadoPaqueteService.listOne(id);
    }
}
