package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.EstadoPaquete;

@Repository
public interface EstadoPaqueteRepository extends JpaRepository<EstadoPaquete, Integer> {
}
