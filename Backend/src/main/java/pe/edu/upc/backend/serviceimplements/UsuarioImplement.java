package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Usuario;
import pe.edu.upc.backend.repositories.IUsuarioRepository;
import pe.edu.upc.backend.serviceinterfaces.IUsuarioService;

import java.util.List;
import java.util.Optional;

@Service
public class    UsuarioImplement implements IUsuarioService {
    @Autowired
    private IUsuarioRepository uR;

    @Override
    public List<Usuario> list() {
        return uR.findAll();
    }

    @Override
    public void insert(Usuario u) {
        uR.save(u);
    }

    @Override
    public void update(Usuario u) {
        // 1. Recuperar el usuario existente de la base de datos
        Optional<Usuario> existingUserOptional = uR.findById(u.getIdUsuario());

        if (existingUserOptional.isPresent()) {
            Usuario existingUsuario = existingUserOptional.get();

            existingUsuario.setNombreUsuario(u.getNombreUsuario());
            existingUsuario.setEmailUsuario(u.getEmailUsuario());
            existingUsuario.setTelefonoUsuario(u.getTelefonoUsuario());
            existingUsuario.setDireccionUsuario(u.getDireccionUsuario());
            existingUsuario.setFechaRegistroUsuario(u.getFechaRegistroUsuario());
            existingUsuario.setUsername(u.getUsername());
            existingUsuario.setEnable(u.isEnable());


            if (u.getPassword() != null && !u.getPassword().isEmpty()) {

                existingUsuario.setPassword(u.getPassword());
            }



            uR.save(existingUsuario);
        } else {
            System.err.println("Error: Usuario con ID " + u.getIdUsuario() + " no encontrado para actualizar.");
        }
    }

    @Override
    public void delete(int id) {
        uR.deleteById(id);
    }

    @Override
    public Usuario listId(int id) {
        return uR.findById(id).orElse(new Usuario());
    }

    @Override
    public List<Usuario> buscar(String nombre) {
        return uR.buscarUsuario(nombre);
    }
}
