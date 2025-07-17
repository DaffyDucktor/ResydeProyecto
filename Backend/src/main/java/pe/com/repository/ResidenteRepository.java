package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Mantenimiento;
import pe.com.model.Residente;
import pe.com.model.Usuario;

import java.util.List;

@Repository
public interface ResidenteRepository extends JpaRepository<Residente, Integer> {

    @Query("SELECT r FROM Residente r WHERE r.idDepartamento.id IN (SELECT d FROM Departamento d WHERE d.idResidencia.id= ?1)")
    List<Residente> getAllByResidencia(Integer idResidencia);

}
