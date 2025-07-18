package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Departamento;
import pe.com.model.Incidencia;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Integer> {

    @Query("SELECT i FROM Incidencia i WHERE i.idResidencia.id = ?1")
    List<Incidencia> getAllByResidencia(Integer idResidencia);

}
