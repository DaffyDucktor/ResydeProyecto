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
@Table(name = "mantenimiento")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
    @JoinColumn(name = "id_residencia", nullable=false)
    private Residencia idResidencia;

    @ManyToOne
    @JoinColumn(name = "id_estado_mantenimiento", nullable=false)
    private EstadoMantenimiento idEstadoMantenimiento;

}
