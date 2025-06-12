package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Mantenimiento;
import pe.com.service.MantenimientoService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/mantenimiento")
@CrossOrigin("http://localhost:4200/")
public class MantenimientoController {

    @Autowired
    MantenimientoService mantenimientoService;

    @GetMapping
    private List<Mantenimiento> listAll(){
        return mantenimientoService.listAll();
    }

    @GetMapping("/{id}")
    private Mantenimiento listOne(@PathVariable Integer id){
        return mantenimientoService.listOne(id);
    }

    @PostMapping
    private Mantenimiento insert(Mantenimiento obj){
        return mantenimientoService.insert(obj);
    }

    @PutMapping
    private Mantenimiento update(Mantenimiento obj) {
        return mantenimientoService.update(obj);
    }

    @DeleteMapping
    private void delete(Mantenimiento obj){
        mantenimientoService.delete(obj);
    }
}
