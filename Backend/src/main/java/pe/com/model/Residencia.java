package pe.com.model;

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
@Table(name = "residencia")
public class Residencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String nombre;

    @Column
    private String direccion;

    @Column
    private String nDepartamento;

    @Column
    private String nEdificio;

    @Column
    private String fecCreacion;

    @Column
    private String usuCreacion;

    @Column
    private String fecModifica;

    @Column
    private String usuModifica;

    @ManyToOne
    @JoinColumn(name = "id_tipo_residencia", nullable=false)
    private TipoResidencia idTipoResidencia;

    @Override
    public String toString() {
        return "Residencia{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", direccion='" + direccion + '\'' +
                ", nDepartamento='" + nDepartamento + '\'' +
                ", nEdificio='" + nEdificio + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idTipoResidencia=" + idTipoResidencia +
                '}';
    }
}
