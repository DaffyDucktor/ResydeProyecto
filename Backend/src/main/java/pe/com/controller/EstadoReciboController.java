package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.EstadoRecibo;
import pe.com.service.EstadoReciboService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/estadoRecibo")
@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class EstadoReciboController {

    private static final Logger logger = LoggerFactory.getLogger(EstadoReciboController.class);

    @Autowired
    EstadoReciboService estadoReciboService;

    @GetMapping
    private List<EstadoRecibo> listAll(){
        logger.info("Listando estados...");
        return estadoReciboService.listAll();
    }

    @GetMapping("/{id}")
    private EstadoRecibo listOne(@PathVariable Integer id){
        logger.info("Listando un estado...");
        return estadoReciboService.listOne(id);
    }
}
