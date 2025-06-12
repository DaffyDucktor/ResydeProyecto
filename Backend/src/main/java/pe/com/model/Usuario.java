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
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String user;

    @Column
    private String password;

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
    @JoinColumn(name = "id_residente", nullable=false)
    private Residente idResidente;

    @ManyToOne
    @JoinColumn(name = "id_rol", nullable=false)
    private Rol idRol;
}
