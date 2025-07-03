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
public class VisitaRequest {

    private String id;
    private String name;
    private String nDocumentacion;
    private String comentario;
    private String visible;
    private String fecha;
    private String hora;
    private String usuario;
    private String idDepartamento;

    @Override
    public String toString() {
        return "VisitaRequest{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", nDocumentacion='" + nDocumentacion + '\'' +
                ", comentario='" + comentario + '\'' +
                ", visible='" + visible + '\'' +
                ", fecha='" + fecha + '\'' +
                ", hora='" + hora + '\'' +
                ", usuario='" + usuario + '\'' +
                ", idDepartamento='" + idDepartamento + '\'' +
                '}';
    }
}
