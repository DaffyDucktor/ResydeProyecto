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
@Table(name = "incidencia")
public class Incidencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String detalle;

    @Column
    private String visible;

    @Column
    private String fecha;

    @Column
    private String hora;

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
}
