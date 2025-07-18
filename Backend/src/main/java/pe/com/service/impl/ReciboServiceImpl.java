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
import pe.com.model.Recibo;
import pe.com.model.request.ReciboRequest;
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.EstadoReciboRepository;
import pe.com.repository.ReciboRepository;
import pe.com.service.ReciboService;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class ReciboServiceImpl implements ReciboService {

    private static final Logger logger = LoggerFactory.getLogger(ReciboServiceImpl.class);

    @Autowired
    ReciboRepository reciboRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Autowired
    EstadoReciboRepository estadoReciboRepository;


    @Override
    public List<Recibo> listAll() {
        return reciboRepository.findAll();
    }

    @Override
    public List<Recibo> listAllByResidencia(Integer idResidencia) {
        logger.info("IdResidencia: {}", idResidencia);
        return reciboRepository.getAllByResidencia(idResidencia);
    }

    @Override
    public Recibo listOne(Integer id) {
        return reciboRepository.getById(id);
    }

    @Override
    public Recibo insert(ReciboRequest obj) {
        Recibo objRecibo = new Recibo();

        objRecibo.setYear(obj.getYear());
        objRecibo.setMonth(obj.getMonth());
        objRecibo.setParticulars(obj.getParticulars());
        objRecibo.setTotal(obj.getTotal());
        objRecibo.setComments(obj.getComments());
        objRecibo.setUsuCreacion(obj.getUsuario());
        objRecibo.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));
        objRecibo.setIdEstadoRecibo(estadoReciboRepository.getById(Integer.parseInt(obj.getIdEstadoRecibo())));

        return reciboRepository.save(objRecibo);
    }

    @Override
    public Recibo update(ReciboRequest obj) {
        Recibo objRecibo = new Recibo();

        objRecibo.setId(Integer.parseInt(obj.getId()));
        objRecibo.setYear(obj.getYear());
        objRecibo.setMonth(obj.getMonth());
        objRecibo.setParticulars(obj.getParticulars());
        objRecibo.setTotal(obj.getTotal());
        objRecibo.setComments(obj.getComments());
        objRecibo.setUsuCreacion(obj.getUsuario());
        objRecibo.setIdDepartamento(departamentoRepository.getById(Integer.parseInt(obj.getIdDepartamento())));
        objRecibo.setIdEstadoRecibo(estadoReciboRepository.getById(Integer.parseInt(obj.getIdDepartamento())));

        return reciboRepository.save(objRecibo);
    }

    @Override
    public void delete(ReciboRequest obj) {
        reciboRepository.deleteById(Integer.parseInt(obj.getId()));
    }

    @Override
    public Integer creacionMasiva(String month, String year, String residence) {

        List<String> objCodigos = departamentoRepository.getAllCodigo(residence);

        objCodigos.forEach(s -> {
            logger.info(s);
        });

        return null;
    }

    @Override
    public void NetWorthExport(){
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Datos");

        Row row = sheet.createRow(0);
        Cell cell = row.createCell(0);
        cell.setCellValue("Promedio de Ingresos");

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
        logger.info("Archivo creado exitosamente.");
    }

    @Override
    public long count() {
        return reciboRepository.count();
    }

    @Override
    public Double balance() {
        List<Recibo> objList = reciboRepository.findAll();

        Double balance = 0.0;

        for (Recibo obj: objList){
            balance = balance + Double.parseDouble(obj.getParticulars());
        }
        return 0.0;
    }
}
