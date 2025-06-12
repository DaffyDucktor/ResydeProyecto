package pe.com.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PagoRequest {

    private String payment;
    private String month;
    private String year;
    private String residence;
    private String fecha;
    private String comment;
    private String user;
}
