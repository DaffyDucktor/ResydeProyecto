package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Mantenimiento;
import pe.com.model.Visita;

import java.util.List;

@Repository
public interface VisitaRepository extends JpaRepository<Visita, Integer> {

    @Query("SELECT v FROM Visita v WHERE v.idDepartamento.id IN (SELECT d FROM Departamento d WHERE d.idResidencia.id= ?1)")
    List<Visita> getAllByResidencia(Integer idResidencia);

}
