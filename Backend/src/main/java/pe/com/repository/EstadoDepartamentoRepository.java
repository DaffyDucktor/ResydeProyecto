package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.EstadoDepartamento;

@Repository
public interface EstadoDepartamentoRepository extends JpaRepository<EstadoDepartamento, Integer> {
}
