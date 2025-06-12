package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Incidencia;
import pe.com.service.IncidenciaService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/incidencia")
@CrossOrigin("http://localhost:4200/")
public class IncidenciaController {

    @Autowired
    IncidenciaService incidenciaService;

    @GetMapping
    private List<Incidencia> listAll(){
        return incidenciaService.listAll();
    }

    @GetMapping("/{id}")
    private Incidencia listOne(@PathVariable Integer id){
        return incidenciaService.listOne(id);
    }

    @PostMapping
    private Incidencia insert(Incidencia obj){
        return incidenciaService.insert(obj);
    }

    @PutMapping
    private Incidencia update(Incidencia obj) {
        return incidenciaService.update(obj);
    }

    @DeleteMapping
    private void delete(Incidencia obj){
        incidenciaService.delete(obj);
    }
}
