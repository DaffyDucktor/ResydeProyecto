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
import pe.com.repository.DepartamentoRepository;
import pe.com.repository.ReciboRepository;
import pe.com.service.ReciboService;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ReciboServiceImpl implements ReciboService {

    private static final Logger log = LoggerFactory.getLogger(ReciboServiceImpl.class);
    @Autowired
    ReciboRepository reciboRepository;

    @Autowired
    DepartamentoRepository departamentoRepository;

    @Override
    public List<Recibo> listAll() {
        return reciboRepository.findAll();
    }

    @Override
    public Recibo listOne(Integer id) {
        return reciboRepository.getById(id);
    }

    @Override
    public Recibo insert(Recibo obj) {
        return reciboRepository.save(obj);
    }

    @Override
    public Recibo update(Recibo obj) {
        return reciboRepository.save(obj);
    }

    @Override
    public void delete(Recibo obj) {
        reciboRepository.delete(obj);
    }

    @Override
    public Integer creacionMasiva(String month, String year, String residence) {

        List<String> objCodigos = departamentoRepository.getAllCodigo(residence);

        objCodigos.forEach(s -> {
            log.info(s);
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
        log.info("Archivo creado exitosamente.");
    }
}
