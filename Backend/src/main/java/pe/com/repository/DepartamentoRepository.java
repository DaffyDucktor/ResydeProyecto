package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Departamento;

import java.util.List;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {

    @Query("SELECT codigo FROM Departamento WHERE id_residencia = ?1")
    List<String> getAllCodigo(String idResidencia);
}
