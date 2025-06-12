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
@Table(name = "departamento")
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

}
