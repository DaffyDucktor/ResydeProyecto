package pe.com.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuppressWarnings({"unused"})
public class ResidenciaRequest {

    private String id;
    private String nombre;
    private String direccion;
    @JsonProperty("nDepartamento")
    private String nDepartamento;
    @JsonProperty("nEdificio")
    private String nEdificio;
    private String fecCreacion;
    private String usuCreacion;
    private String fecModifica;
    private String usuModifica;
    private String idTipoResidencia;

    @Override
    public String toString() {
        return "ResidenciaRequest{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", direccion='" + direccion + '\'' +
                ", nDepartamento='" + nDepartamento + '\'' +
                ", nEdificio='" + nEdificio + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idTipoResidencia='" + idTipoResidencia + '\'' +
                '}';
    }
}
