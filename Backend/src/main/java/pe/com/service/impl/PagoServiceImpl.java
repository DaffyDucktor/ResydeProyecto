package pe.com.service.impl;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Pago;
import pe.com.model.request.PagoRequest;
import pe.com.repository.PagoRepository;
import pe.com.repository.ReciboRepository;
import pe.com.service.PagoService;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class PagoServiceImpl implements PagoService {

    private static final Logger log = LoggerFactory.getLogger(PagoServiceImpl.class);
    @Autowired
    PagoRepository pagoRepository;

    @Autowired
    ReciboRepository reciboRepository;

    @Override
    public List<Pago> listAll() {
        return pagoRepository.findAll();
    }

    @Override
    public Pago listOne(Integer id) {
        return pagoRepository.getById(id);
    }

    @Override
    public Pago insert(PagoRequest obj) {
        Pago objPago = new Pago();

        objPago.setPaidAmount(obj.getPaidAmount());
        objPago.setBalance(obj.getBalance());
        objPago.setMora(obj.getMora());
        objPago.setFecha(obj.getFecha());
        objPago.setComments(obj.getComments());
        objPago.setUsuCreacion(obj.getUsuario());
        objPago.setIdRecibo(reciboRepository.getById(Integer.parseInt(obj.getIdRecibo())));

        return pagoRepository.save(objPago);
    }

    @Override
    public Pago update(PagoRequest obj) {
        Pago objPago = new Pago();

        objPago.setId(Integer.parseInt(obj.getId()));
        objPago.setPaidAmount(obj.getPaidAmount());
        objPago.setBalance(obj.getBalance());
        objPago.setMora(obj.getMora());
        objPago.setFecha(obj.getFecha());
        objPago.setComments(obj.getComments());
        objPago.setUsuModifica(obj.getUsuario());
        objPago.setIdRecibo(reciboRepository.getById(Integer.parseInt(obj.getIdRecibo())));

        return pagoRepository.save(objPago);
    }

    @Override
    public void delete(PagoRequest obj) {
        pagoRepository.deleteById(Integer.parseInt(obj.getId()));
    }

    @Override
    public Integer cargaMasiva(List<PagoRequest> obj) {

        obj.forEach(pagoRequest -> {
            log.info(obj.toString());

        });

        return 0;
    }

    @Override
    public void NetWorthExport(){
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Datos");

        Row row = sheet.createRow(0);
        Cell cell = row.createCell(0);
        cell.setCellValue("Promedio de Egresos");

        try (FileOutputStream fileOut = new FileOutputStream("reporte.xlsx")) {
            workbook.write(fileOut);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        log.info("Archivo creado exitosamente.");
    }

    @Override
    public long count() {
        return reciboRepository.count();
    }

    @Override
    public Double balance() {
        List<Pago> objList = pagoRepository.findAll();

        Double balance = 0.0;

        for (Pago obj: objList){
            balance = balance + Double.parseDouble(obj.getBalance());
        }
        return 0.0;
    }
}
