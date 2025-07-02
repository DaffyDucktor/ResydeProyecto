package pe.com.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuppressWarnings({"unused"})
public class PagoRequest {
    private String id;
    private String paidAmount;
    private String balance;
    private String mora;
    private String fecha;
    private String comments;
    private String fecCreacion;
    private String usuCreacion;
    private String fecModifica;
    private String usuModifica;
    private String idRecibo;

    @Override
    public String toString() {
        return "PagoRequest{" +
                "id='" + id + '\'' +
                ", paidAmount='" + paidAmount + '\'' +
                ", balance='" + balance + '\'' +
                ", mora='" + mora + '\'' +
                ", fecha='" + fecha + '\'' +
                ", comments='" + comments + '\'' +
                ", fecCreacion='" + fecCreacion + '\'' +
                ", usuCreacion='" + usuCreacion + '\'' +
                ", fecModifica='" + fecModifica + '\'' +
                ", usuModifica='" + usuModifica + '\'' +
                ", idRecibo='" + idRecibo + '\'' +
                '}';
    }
}
