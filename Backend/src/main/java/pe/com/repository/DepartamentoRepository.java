package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Departamento;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {

    @Query("SELECT codigo FROM Departamento WHERE id_residencia = ?1")
    List<String> getAllCodigo(String idResidencia);

    @Query("SELECT d FROM Departamento d WHERE d.idResidencia.id = ?1")
    List<Departamento> getAllByResidencia(Integer idResidencia);

    @Transactional(value = Transactional.TxType.REQUIRED)
    @Query("DELETE FROM Departamento WHERE id_residencia = ?1")
    void deleteAllResidencia(String idResidencia);
}
