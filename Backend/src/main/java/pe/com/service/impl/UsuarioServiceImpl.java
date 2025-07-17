package pe.com.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.model.Usuario;
import pe.com.model.request.UsuarioRequest;
import pe.com.repository.ResidenciaRepository;
import pe.com.repository.ResidenteRepository;
import pe.com.repository.RolRepository;
import pe.com.repository.UsuarioRepository;
import pe.com.service.UsuarioService;

import java.util.List;

@Service
@SuppressWarnings({"deprecation","unused"})
public class UsuarioServiceImpl implements UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    ResidenciaRepository residenciaRepository;

    @Autowired
    ResidenteRepository residenteRepository;

    @Autowired
    RolRepository rolRepository;

    @Override
    public List<Usuario> listAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public List<Usuario> listAllByResidencia(Integer idResidencia) {
        logger.info("IdResidencia: {}", idResidencia);
        return usuarioRepository.getAllByResidencia(idResidencia);
    }

    @Override
    public Usuario listOne(Integer id) {
        return usuarioRepository.getById(id);
    }

    @Override
    public Usuario insert(UsuarioRequest obj) {
        Usuario objUsuario = new Usuario();

        objUsuario.setUsuario(obj.getUsuario());
        objUsuario.setPassword(obj.getPassword());
        objUsuario.setUsuCreacion(obj.getUsuario());
        objUsuario.setIdResidencia(residenciaRepository.getById(Integer.parseInt(obj.getIdResidencia())));
        objUsuario.setIdResidente(residenteRepository.getById(Integer.parseInt(obj.getIdResidente())));
        objUsuario.setIdRol(rolRepository.getById(Integer.parseInt(obj.getIdRol())));

        return usuarioRepository.save(objUsuario);
    }

    @Override
    public Usuario update(UsuarioRequest obj) {
        Usuario objUsuario = new Usuario();

        objUsuario.setUsuario(obj.getUsuario());
        objUsuario.setPassword(obj.getPassword());
        objUsuario.setUsuModifica(obj.getUsuario());
        objUsuario.setIdResidencia(residenciaRepository.getById(Integer.parseInt(obj.getIdResidencia())));
        objUsuario.setIdResidente(residenteRepository.getById(Integer.parseInt(obj.getIdResidente())));
        objUsuario.setIdRol(rolRepository.getById(Integer.parseInt(obj.getIdRol())));

        return usuarioRepository.save(objUsuario);
    }

    @Override
    public void delete(UsuarioRequest obj) {
        usuarioRepository.deleteById(Integer.parseInt(obj.getId()));
    }
}
