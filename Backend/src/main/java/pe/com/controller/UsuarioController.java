package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Usuario;
import pe.com.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/usuario")
@CrossOrigin("http://localhost:4200/")
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(DepartamentoController.class);

    @Autowired
    UsuarioService usuarioService;

    @GetMapping
    private List<Usuario> listAll(){
        logger.info("Listando Usuarios...");
        return usuarioService.listAll();
    }

    @GetMapping("/{id}")
    private Usuario listOne(@PathVariable Integer id){
        logger.info("Listando un Usuario...");
        return usuarioService.listOne(id);
    }

    @PostMapping
    private Usuario insert(Usuario obj){
        logger.info("Creando un Usuario...");
        return usuarioService.insert(obj);
    }

    @PutMapping
    private Usuario update(Usuario obj) {
        logger.info("Modificando un Usuario...");
        return usuarioService.update(obj);
    }

    @DeleteMapping
    private void delete(Usuario obj){
        logger.info("Eliminando un Usuario...");
        usuarioService.delete(obj);
    }
}
