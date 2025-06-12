package pe.com.service;

import pe.com.model.Usuario;

import java.util.List;

public interface UsuarioService {

    List<Usuario> listAll();

    Usuario listOne(Integer id);

    Usuario insert (Usuario obj);

    Usuario update (Usuario obj);

    void delete (Usuario obj);

}
