package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Paquete;
import pe.com.service.PaqueteService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/paquete")
@CrossOrigin("http://localhost:4200/")
public class PaqueteController {

    @Autowired
    PaqueteService paqueteService;

    @GetMapping
    private List<Paquete> listAll(){
        return paqueteService.listAll();
    }

    @GetMapping("/{id}")
    private Paquete listOne(@PathVariable Integer id){
        return paqueteService.listOne(id);
    }

    @PostMapping
    private Paquete insert(Paquete obj){
        return paqueteService.insert(obj);
    }

    @PutMapping
    private Paquete update(Paquete obj) {
        return paqueteService.update(obj);
    }

    @DeleteMapping
    private void delete(Paquete obj){
        paqueteService.delete(obj);
    }
}
