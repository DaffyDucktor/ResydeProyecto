package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Departamento;
import pe.com.model.request.DepartamentoRequest;
import pe.com.service.DepartamentoService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/departamento")
@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class DepartamentoController {

    private static final Logger logger = LoggerFactory.getLogger(DepartamentoController.class);

    @Autowired
    DepartamentoService departamentoService;

    @GetMapping
    private List<Departamento> listAll(){
        logger.info("Listando departamentos...");
        return departamentoService.listAll();
    }

    @GetMapping("/{id}")
    private Departamento listOne(@PathVariable Integer id){
        logger.info("Listando un departamento...");
        return departamentoService.listOne(id);
    }

    @PostMapping
    private Departamento insert(@RequestBody DepartamentoRequest obj){
        logger.info("Creando un departamento...");
        return departamentoService.insert(obj);
    }

    @PutMapping
    private Departamento update(@RequestBody DepartamentoRequest obj) {
        logger.info("Modificando un departamento...");
        return departamentoService.update(obj);
    }

    @DeleteMapping
    private void delete(@RequestBody DepartamentoRequest obj){
        logger.info("Eliminando un departamento...");
        departamentoService.delete(obj);
    }
}
