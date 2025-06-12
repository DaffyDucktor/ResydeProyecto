package pe.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Usuario;
import pe.com.repository.UsuarioRepository;
import pe.com.service.UsuarioService;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> listAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario listOne(Integer id) {
        return usuarioRepository.getById(id);
    }

    @Override
    public Usuario insert(Usuario obj) {
        return usuarioRepository.save(obj);
    }

    @Override
    public Usuario update(Usuario obj) {
        return usuarioRepository.save(obj);
    }

    @Override
    public void delete(Usuario obj) {
        usuarioRepository.delete(obj);
    }
}
