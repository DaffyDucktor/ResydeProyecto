package pe.com.service;

import pe.com.model.Residente;
import pe.com.model.Rol;

import java.util.List;

public interface RolService {
    List<Rol> listAll();

    Rol listOne(Integer id);

    Rol insert (Rol obj);

    Rol update (Rol obj);

    void delete (Rol obj);
}
