package pe.com.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuppressWarnings({"unused"})
public class DepartamentoRequest {

    private String id;
    private String codigo;
    private String fecCreacion;
    private String usuCreacion;
    private String fecModifica;
    private String usuModifica;
    private String idResidencia;
    private String idEstadoDepartamento;

    @Override
    public String toString() {
        return "DepartamentoRequest{" +
                "id='" + id + '\'' +
                ", codigo='" + codigo + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idResidencia='" + idResidencia + '\'' +
                ", idEstadoDepartamento='" + idEstadoDepartamento + '\'' +
                '}';
    }
}
