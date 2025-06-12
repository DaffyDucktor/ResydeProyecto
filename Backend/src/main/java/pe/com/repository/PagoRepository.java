package pe.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.model.Pago;

import javax.transaction.Transactional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Pago (paid_amount, balance, mora, fecha, comments, fec_creacion, usu_creacion) values (?1, ?2, ?3, ?4, ?5, ?6, NOW(), ?7)" ,
            nativeQuery = true)
    Pago cargaIndividual(String paidAmount, String balance, String mora, String fecha, String comments, String usuCreacion);
}
