package pe.com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Incidencia;
import pe.com.model.Residente;
import pe.com.model.request.ResidenteRequest;
import pe.com.service.ResidenteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/resyde/residente")
//@CrossOrigin("http://localhost:4200/")
@SuppressWarnings({"unused"})
public class ResidenteController {

    private static final Logger logger = LoggerFactory.getLogger(ResidenteController.class);

    @Autowired
    ResidenteService residenteService;

    @GetMapping
    private List<Residente> listAll() {
        logger.info("Listando Residentes...");
        return residenteService.listAll();
    }

    @GetMapping("count")
    private long count() {
        logger.info("Contar departamentos...");
        return residenteService.count();
    }

    @GetMapping("/listAllByResidencia/{idResidencia}")
    private List<Residente> listAllByResidencia(@PathVariable(required = false) Integer idResidencia) {
        logger.info("Listando residentes por la residencia...: {}", idResidencia);
        return residenteService.listAllByResidencia(idResidencia);
    }

    @GetMapping("/{id}")
    private Residente listOne(@PathVariable Integer id) {
        logger.info("Listando un Residente...");
        return residenteService.listOne(id);
    }

    @PostMapping
    private Residente insert(@RequestPart(value = "residente") ResidenteRequest obj) {
        logger.info("RESIDENTE REQUEST: {}", obj.toString());

        if (Optional.ofNullable(obj.getId()).orElse("").isEmpty()) {
            logger.info("Creando un Residente...");
            return residenteService.insert(obj);
        } else {
            logger.info("Modificando un Residente...");
            return residenteService.update(obj);
        }
    }

    @PutMapping
    private Residente update(ResidenteRequest obj) {
        logger.info("Modificando un Residente...");
        return residenteService.update(obj);
    }

    @DeleteMapping
    private void delete(ResidenteRequest obj) {
        logger.info("Eliminando un Residente...");
        residenteService.delete(obj);
    }
}
