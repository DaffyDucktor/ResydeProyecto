package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.EstadoDepartamento;
import pe.com.model.TipoResidencia;
import pe.com.service.EstadoDepartamentoService;
import pe.com.service.TipoResidenciaService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/tipoResidencia")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class TipoResidenciaController {

    private static final Logger logger = LoggerFactory.getLogger(TipoResidenciaController.class);

    @Autowired
    TipoResidenciaService tipoResidenciaService;

    @GetMapping
    private List<TipoResidencia> listAll(){
        logger.info("Listando estados...");
        return tipoResidenciaService.listAll();
    }

    @GetMapping("/{id}")
    private TipoResidencia listOne(@PathVariable Integer id){
        logger.info("Listando un estado...");
        return tipoResidenciaService.listOne(id);
    }

}
