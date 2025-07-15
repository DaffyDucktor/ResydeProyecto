package pe.com.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "departamento")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String codigo;

    @Column
    private String fecCreacion;

    @Column
    private String usuCreacion;

    @Column
    private String fecModifica;

    @Column
    private String usuModifica;

    @ManyToOne
    @JoinColumn(name = "id_residencia", nullable=false)
    private Residencia idResidencia;

    @ManyToOne
    @JoinColumn(name = "id_estado_departamento", nullable=false)
    private EstadoDepartamento idEstadoDepartamento;


    @Override
    public String toString() {
        return "Departamento{" +
                "id=" + id +
                ", codigo='" + codigo + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idResidencia=" + idResidencia.getNombre() +
                ", idEstadoDepartamento=" + idEstadoDepartamento.getEstado() +
                '}';
    }
}
