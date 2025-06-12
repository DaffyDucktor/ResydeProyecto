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
@Table(name = "paquete")
public class Paquete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String remitente;

    @Column
    private String descripcion;

    @Column
    private String fecha;

    @Column
    private String hora;

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
    @JoinColumn(name = "id_departamento", nullable=false)
    private Departamento idDepartamento;

    @ManyToOne
    @JoinColumn(name = "id_estado_paquete", nullable=false)
    private EstadoPaquete idEstadoPaquete;

}
