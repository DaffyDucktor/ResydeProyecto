package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.EstadoMantenimiento;

@Repository
public interface EstadoMantenimientoRepository extends JpaRepository<EstadoMantenimiento, Integer> {
}
