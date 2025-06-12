package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Pago;
import pe.com.model.request.PagoRequest;
import pe.com.service.PagoService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/pago")
@CrossOrigin("http://localhost:4200/")
public class PagoController {

    @Autowired
    PagoService pagoService;

    @GetMapping
    private List<Pago> listAll(){
        return pagoService.listAll();
    }

    @GetMapping("/{id}")
    private Pago listOne(@PathVariable Integer id){
        return pagoService.listOne(id);
    }

    @PostMapping
    private Pago insert(Pago obj){
        return pagoService.insert(obj);
    }

    @PutMapping
    private Pago update(Pago obj) {
        return pagoService.update(obj);
    }

    @DeleteMapping
    private void delete(Pago obj){
        pagoService.delete(obj);
    }

    @PostMapping("/cargaMasiva")
    private Integer cargaMasiva(@RequestAttribute(name = "pagos")List<PagoRequest> objPagos){
        return pagoService.cargaMasiva(objPagos);
    }
}
