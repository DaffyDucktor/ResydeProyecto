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
public class MantenimientoRequest {
    private String id;
    private String descripcion;
    private String fechaIni;
    private String fechaFin;
    private String fecCreacion;
    private String usuCreacion;
    private String fecModifica;
    private String usuModifica;
    private String idDepartamento;
    private String idEstadoMantenimiento;

    @Override
    public String toString() {
        return "MantenimientoRequest{" +
                "id='" + id + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", fechaIni='" + fechaIni + '\'' +
                ", fechaFin='" + fechaFin + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idDepartamento='" + idDepartamento + '\'' +
                ", idEstadoMantenimiento='" + idEstadoMantenimiento + '\'' +
                '}';
    }
}
