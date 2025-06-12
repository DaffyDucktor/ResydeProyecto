package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Rol;
import pe.com.service.RolService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/rol")
@CrossOrigin("http://localhost:4200/")
public class RolController {

    @Autowired
    RolService rolService;

    @GetMapping
    private List<Rol> listAll(){
        return rolService.listAll();
    }

    @GetMapping("/{id}")
    private Rol listOne(@PathVariable Integer id){
        return rolService.listOne(id);
    }

    @PostMapping
    private Rol insert(Rol obj){
        return rolService.insert(obj);
    }

    @PutMapping
    private Rol update(Rol obj) {
        return rolService.update(obj);
    }

    @DeleteMapping
    private void delete(Rol obj){
        rolService.delete(obj);
    }
}
