package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Usuario;
import pe.com.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/usuario")
@CrossOrigin("http://localhost:4200/")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping
    private List<Usuario> listAll(){
        return usuarioService.listAll();
    }

    @GetMapping("/{id}")
    private Usuario listOne(@PathVariable Integer id){
        return usuarioService.listOne(id);
    }

    @PostMapping
    private Usuario insert(Usuario obj){
        return usuarioService.insert(obj);
    }

    @PutMapping
    private Usuario update(Usuario obj) {
        return usuarioService.update(obj);
    }

    @DeleteMapping
    private void delete(Usuario obj){
        usuarioService.delete(obj);
    }
}
