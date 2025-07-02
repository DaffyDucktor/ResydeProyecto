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
public class PaqueteRequest {
    private String id;
    private String remitente;
    private String descripcion;
    private String fecha;
    private String hora;
    private String codigo;
    private String fecCreacion;
    private String usuCreacion;
    private String fecModifica;
    private String usuModifica;
    private String idDepartamento;
    private String idEstadoPaquete;

    @Override
    public String toString() {
        return "PaqueteRequest{" +
                "id='" + id + '\'' +
                ", remitente='" + remitente + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", fecha='" + fecha + '\'' +
                ", hora='" + hora + '\'' +
                ", codigo='" + codigo + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idDepartamento='" + idDepartamento + '\'' +
                ", idEstadoPaquete='" + idEstadoPaquete + '\'' +
                '}';
    }
}
