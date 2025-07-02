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
public class UsuarioRequest {
    private String id;
    private String user;
    private String password;
    private String fecCreacion;
    private String usuCreacion;
    private String fecModifica;
    private String usuModifica;
    private String idResidencia;
    private String idResidente;
    private String idRol;

    @Override
    public String toString() {
        return "UsuarioRequest{" +
                "id='" + id + '\'' +
                ", user='" + user + '\'' +
                ", password='" + password + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idResidencia='" + idResidencia + '\'' +
                ", idResidente='" + idResidente + '\'' +
                ", idRol='" + idRol + '\'' +
                '}';
    }
}
