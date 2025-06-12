package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Residente;
import pe.com.service.ResidenteService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/residente")
@CrossOrigin("http://localhost:4200/")
public class ResidenteController {

    @Autowired
    ResidenteService residenteService;

    @GetMapping
    private List<Residente> listAll(){
        return residenteService.listAll();
    }

    @GetMapping("/{id}")
    private Residente listOne(@PathVariable Integer id){
        return residenteService.listOne(id);
    }

    @PostMapping
    private Residente insert(Residente obj){
        return residenteService.insert(obj);
    }

    @PutMapping
    private Residente update(Residente obj) {
        return residenteService.update(obj);
    }

    @DeleteMapping
    private void delete(Residente obj){
        residenteService.delete(obj);
    }
}
