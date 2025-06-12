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
@Table(name = "mantenimiento")
public class Mantenimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String descripcion;

    @Column
    private String fechaIni;

    @Column
    private String fechaFin;

    @Column
    private String fecCreacion;

    @Column
    private String usuCreacion;

    @Column
    private String fecModifica;

    @Column
    private String usuModifica;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable=false)
    private Departamento idDepartamento;

    @ManyToOne
    @JoinColumn(name = "id_estado_departamento", nullable=false)
    private EstadoMantenimiento idEstadoMantenimiento;

}
