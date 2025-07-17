package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Mantenimiento;
import pe.com.model.Recibo;

import java.util.List;

@Repository
public interface ReciboRepository extends JpaRepository<Recibo, Integer> {

    @Query("SELECT r FROM Recibo r WHERE r.idDepartamento.id IN (SELECT d FROM Departamento d WHERE d.idResidencia.id= ?1)")
    List<Recibo> getAllByResidencia(Integer idResidencia);

}
