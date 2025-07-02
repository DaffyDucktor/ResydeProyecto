package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Rol;
import pe.com.service.RolService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/rol")
@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class RolController {

    private static final Logger logger = LoggerFactory.getLogger(RolController.class);

    @Autowired
    RolService rolService;

    @GetMapping
    private List<Rol> listAll(){
        logger.info("Listando Roles...");
        return rolService.listAll();
    }

    @GetMapping("/{id}")
    private Rol listOne(@PathVariable Integer id){
        logger.info("Listando un Rol...");
        return rolService.listOne(id);
    }
}
