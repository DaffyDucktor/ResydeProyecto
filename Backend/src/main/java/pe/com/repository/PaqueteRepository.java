package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.Paquete;

@Repository
public interface PaqueteRepository extends JpaRepository<Paquete, Integer> {
}
