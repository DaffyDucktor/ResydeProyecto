package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.model.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
}
