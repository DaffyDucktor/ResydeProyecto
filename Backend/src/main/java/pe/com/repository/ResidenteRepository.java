package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.Residente;

@Repository
public interface ResidenteRepository extends JpaRepository<Residente, Integer> {
}
