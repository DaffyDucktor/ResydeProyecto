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
public class ResidenteRequest {

    private String id;
    private String nombre;
    private String apellido;
    private String telefono;
    private String correo;
    private String fecCreacion;
    private String usuCreacion;
    private String fecModifica;
    private String usuModifica;
    private String idDepartamento;

    @Override
    public String toString() {
        return "ResidenteRequest{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", telefono='" + telefono + '\'' +
                ", correo='" + correo + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idDepartamento='" + idDepartamento + '\'' +
                '}';
    }
}