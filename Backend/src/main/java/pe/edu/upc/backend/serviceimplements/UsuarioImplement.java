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

            // 2. Actualizar los campos del usuario existente con los datos de la entidad 'u' recibida.
            existingUsuario.setNombreUsuario(u.getNombreUsuario());
            existingUsuario.setEmailUsuario(u.getEmailUsuario());
            existingUsuario.setTelefonoUsuario(u.getTelefonoUsuario());
            existingUsuario.setDireccionUsuario(u.getDireccionUsuario());
            existingUsuario.setFechaRegistroUsuario(u.getFechaRegistroUsuario());
            existingUsuario.setUsername(u.getUsername());
            existingUsuario.setEnable(u.isEnable());

            // 3. Lógica condicional para la contraseña:
            // Si la entidad 'u' que llega a este método tiene una contraseña (no nula y no vacía),
            // significa que el controlador ha enviado una NUEVA contraseña (ya hasheada).
            // En ese caso, la actualizamos.
            // Si u.getPassword() es nulo o vacío, la contraseña existente NO se modifica.
            // Esto es vital si el controlador mapea un DTO sin password a un Usuario.
            if (u.getPassword() != null && !u.getPassword().isEmpty()) {
                // NOTA: La contraseña ya debería venir hasheada desde el controlador si se cambió.
                // Aquí simplemente la asignamos.
                existingUsuario.setPassword(u.getPassword());
            }
            // Si u.getPassword() es nulo o vacío, la contraseña existente en 'existingUsuario'
            // (que se cargó de la base de datos) permanecerá sin cambios.

            // 4. Guardar el usuario actualizado en la base de datos
            uR.save(existingUsuario);
        } else {
            System.err.println("Error: Usuario con ID " + u.getIdUsuario() + " no encontrado para actualizar.");
            // Considera lanzar una excepción personalizada aquí
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
