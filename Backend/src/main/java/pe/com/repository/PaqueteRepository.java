package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Paquete;
import pe.com.model.Recibo;

import java.util.List;

@Repository
public interface PaqueteRepository extends JpaRepository<Paquete, Integer> {

    @Query("SELECT p FROM Paquete p WHERE p.idDepartamento.id IN (SELECT d FROM Departamento d WHERE d.idResidencia.id= ?1)")
    List<Paquete> getAllByResidencia(Integer idResidencia);

}
