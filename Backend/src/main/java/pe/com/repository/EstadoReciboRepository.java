package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.EstadoRecibo;

@Repository
public interface EstadoReciboRepository extends JpaRepository<EstadoRecibo, Integer> {
}
