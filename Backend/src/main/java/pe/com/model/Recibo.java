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
@Table(name = "recibo")
public class Recibo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String year;

    @Column
    private String month;

    @Column
    private String particulars;

    @Column
    private String total;

    @Column
    private String comments;

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
    @JoinColumn(name = "id_estado_recibo", nullable=false)
    private EstadoRecibo idEstadoRecibo;
}
