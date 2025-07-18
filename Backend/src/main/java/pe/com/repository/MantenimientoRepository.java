package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Incidencia;
import pe.com.model.Mantenimiento;

import java.util.List;

@Repository
public interface MantenimientoRepository extends JpaRepository<Mantenimiento, Integer> {

    @Query("SELECT m FROM Mantenimiento m WHERE m.idResidencia.id = ?1")
    List<Mantenimiento> getAllByResidencia(Integer idResidencia);

}
