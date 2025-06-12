package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Departamento;
import pe.com.service.DepartamentoService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/departamento")
@CrossOrigin("http://localhost:4200/")
public class DepartamentoController {

    @Autowired
    DepartamentoService departamentoService;

    @GetMapping
    private List<Departamento> listAll(){
        return departamentoService.listAll();
    }

    @GetMapping("/{id}")
    private Departamento listOne(@PathVariable Integer id){
        return departamentoService.listOne(id);
    }

    @PostMapping
    private Departamento insert(Departamento obj){
        return departamentoService.insert(obj);
    }

    @PutMapping
    private Departamento update(Departamento obj) {
        return departamentoService.update(obj);
    }

    @DeleteMapping
    private void delete(Departamento obj){
        departamentoService.delete(obj);
    }
}
