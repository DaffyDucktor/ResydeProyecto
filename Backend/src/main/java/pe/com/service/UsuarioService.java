package pe.com.service;

import pe.com.model.Usuario;
import pe.com.model.request.UsuarioRequest;

import java.util.List;

public interface UsuarioService {

    List<Usuario> listAll();

    List<Usuario> listAllByResidencia(Integer idResidencia);

    Usuario listOne(Integer id);

    Usuario insert (UsuarioRequest obj);

    Usuario update (UsuarioRequest obj);

    void delete (UsuarioRequest obj);

}
