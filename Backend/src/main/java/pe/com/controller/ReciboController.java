package pe.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.com.model.Recibo;
import pe.com.service.ReciboService;

import java.util.List;

@RestController
@RequestMapping(value = "/resyde/recibo")
@CrossOrigin("http://localhost:4200/")
public class ReciboController {

    @Autowired
    ReciboService reciboService;

    @GetMapping
    private List<Recibo> listAll(){
        return reciboService.listAll();
    }

    @GetMapping("/{id}")
    private Recibo listOne(@PathVariable Integer id){
        return reciboService.listOne(id);
    }

    @PostMapping
    private Recibo insert(Recibo obj){
        return reciboService.insert(obj);
    }

    @PutMapping
    private Recibo update(Recibo obj) {
        return reciboService.update(obj);
    }

    @DeleteMapping
    private void delete(Recibo obj){
        reciboService.delete(obj);
    }

    @PostMapping("/reciboController")
    private Integer cargaMasiva(@RequestAttribute(name = "month")String month,
                                @RequestAttribute(name = "year")String year,
                                @RequestAttribute(name = "residence")String residence){
        return reciboService.creacionMasiva(month, year, residence);
    }
}
