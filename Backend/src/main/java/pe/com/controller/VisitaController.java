package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Visita;
import pe.com.service.VisitaService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/visita")
@CrossOrigin("http://localhost:4200/")
public class VisitaController {

    @Autowired
    VisitaService visitaService;
    
    @GetMapping
    private List<Visita> listAll(){
        return visitaService.listAll();
    }

    @GetMapping("/{id}")
    private Visita listOne(@PathVariable Integer id){
        return visitaService.listOne(id);
    }

    @PostMapping
    private Visita insert(Visita obj){
        return visitaService.insert(obj);
    }

    @PutMapping
    private Visita update(Visita obj) {
        return visitaService.update(obj);
    }

    @DeleteMapping
    private void delete(Visita obj){
        visitaService.delete(obj);
    }

}
