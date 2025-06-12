package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.Residencia;

@Repository
public interface ResidenciaRepository extends JpaRepository<Residencia, Integer> {
}
