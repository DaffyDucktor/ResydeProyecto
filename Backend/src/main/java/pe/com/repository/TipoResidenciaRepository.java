package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.TipoResidencia;

@Repository
public interface TipoResidenciaRepository extends JpaRepository<TipoResidencia, Integer> {
}
