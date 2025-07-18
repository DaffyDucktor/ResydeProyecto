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
public class IncidenciaRequest {
    private String id;
    private String detalle;
    private String visible;
    private String fecha;
    private String hora;
    private String usuario;
    private String idResidencia;

    @Override
    public String toString() {
        return "IncidenciaRequest{" +
                "id='" + id + '\'' +
                ", detalle='" + detalle + '\'' +
                ", visible='" + visible + '\'' +
                ", fecha='" + fecha + '\'' +
                ", hora='" + hora + '\'' +
                ", usuario='" + usuario + '\'' +
                ", idResidencia='" + idResidencia + '\'' +
                '}';
    }
}
