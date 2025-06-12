package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Residencia;
import pe.com.service.ResidenciaService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/residencia")
@CrossOrigin("http://localhost:4200/")
public class ResidenciaController {

    @Autowired
    ResidenciaService residenciaService;

    @GetMapping
    private List<Residencia> listAll(){
        return residenciaService.listAll();
    }

    @GetMapping("/{id}")
    private Residencia listOne(@PathVariable Integer id){
        return residenciaService.listOne(id);
    }

    @PostMapping
    private Residencia insert(Residencia obj){
        return residenciaService.insert(obj);
    }

    @PutMapping
    private Residencia update(Residencia obj) {
        return residenciaService.update(obj);
    }

    @DeleteMapping
    private void delete(Residencia obj){
        residenciaService.delete(obj);
    }

}
