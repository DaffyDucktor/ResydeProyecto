package pe.com.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuppressWarnings({"unused"})
public class ReciboRequest {

    private String id;
    private String year;
    private String month;
    private String particulars;
    private String total;
    private String comments;
    private String usuario;
    private String idDepartamento;
    private String idEstadoRecibo;

    @Override
    public String toString() {
        return "ReciboRequest{" +
                "id='" + id + '\'' +
                ", year='" + year + '\'' +
                ", month='" + month + '\'' +
                ", particulars='" + particulars + '\'' +
                ", total='" + total + '\'' +
                ", comments='" + comments + '\'' +
                ", usuario='" + usuario + '\'' +
                ", idDepartamento='" + idDepartamento + '\'' +
                ", idEstadoRecibo='" + idEstadoRecibo + '\'' +
                '}';
    }
}
