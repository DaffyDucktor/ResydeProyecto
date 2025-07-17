package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import pe.com.model.Residente;
import pe.com.model.Usuario;
import pe.com.model.request.UsuarioRequest;
import pe.com.service.UsuarioService;

@RestController
@RequestMapping(value = "/resyde/usuario")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    UsuarioService usuarioService;

    @GetMapping
    private List<Usuario> listAll(){
        logger.info("Listando Usuarios...");
        return usuarioService.listAll();
    }

    @GetMapping("/listAllByResidencia/{idResidencia}")
    private List<Usuario> listAllByResidencia(@PathVariable(required = false) Integer idResidencia){
        logger.info("Listando usuarios por la residencia...: {}", idResidencia);
        return usuarioService.listAllByResidencia(idResidencia);
    }

    @GetMapping("/{id}")
    private Usuario listOne(@PathVariable Integer id){
        logger.info("Listando un Usuario...");
        return usuarioService.listOne(id);
    }

    @PostMapping
    private Usuario insert(@RequestPart(value = "usuario")UsuarioRequest obj){
        logger.info("USUARIO REQUEST: {}", obj.toString());

        if (Optional.ofNullable(obj.getId()).orElse("").isEmpty()) {
            logger.info("Creando un Usuario...");
            return usuarioService.insert(obj);
        } else {
            logger.info("Modificando un Usuario...");
            return usuarioService.update(obj);
        }
    }

    @PutMapping
    private Usuario update(UsuarioRequest obj) {
        logger.info("Modificando un Usuario...");
        return usuarioService.update(obj);
    }

    @DeleteMapping
    private void delete(UsuarioRequest obj){
        logger.info("Eliminando un Usuario...");
        usuarioService.delete(obj);
    }
}
