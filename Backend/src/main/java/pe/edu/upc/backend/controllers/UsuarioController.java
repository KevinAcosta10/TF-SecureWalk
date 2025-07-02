package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.ActualizarUsuarioDTO;
import pe.edu.upc.backend.dtos.UsuarioDTO;
import pe.edu.upc.backend.entities.Usuario;
import pe.edu.upc.backend.serviceinterfaces.IUsuarioService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private IUsuarioService uS;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/listar") //LISTA SIN MOSTRAR CONTRASEÑA
    public List<UsuarioDTO> listar() {
        return uS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, UsuarioDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody UsuarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Usuario us = m.map(dto, Usuario.class);
        String encodedPassword = passwordEncoder.encode(us.getPassword()); // Hashea la contraseña
        us.setPassword(encodedPassword); // Asigna la contraseña hasheada a la entidad
        uS.insert(us);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody ActualizarUsuarioDTO dto) {
        // 1. Obtener el usuario existente de la base de datos
        // Esto es CRUCIAL para preservar la contraseña actual si no se cambia.
        Usuario existingUsuario = uS.listId(dto.getIdUsuario()); // Obtiene la entidad completa (con contraseña hasheada)

        // 2. Mapear los campos del DTO a la entidad existente, EXCLUYENDO la contraseña.
        // Copiamos manualmente los campos no sensibles para evitar sobrescribir la contraseña
        // con un valor nulo si el DTO no la contiene.
        existingUsuario.setNombreUsuario(dto.getNombreUsuario());
        existingUsuario.setEmailUsuario(dto.getEmailUsuario());
        existingUsuario.setTelefonoUsuario(dto.getTelefonoUsuario());
        existingUsuario.setDireccionUsuario(dto.getDireccionUsuario());
        existingUsuario.setFechaRegistroUsuario(dto.getFechaRegistroUsuario());
        existingUsuario.setUsername(dto.getUsername());
        existingUsuario.setEnable(dto.isEnable());

        // 3. Lógica condicional para la contraseña:
        // Si el DTO de actualización *no tiene* un campo de contraseña (como ActualizarUsuarioDTO),
        // entonces no hay nueva contraseña que hashear.
        // Si tu frontend enviara una nueva contraseña en un DTO diferente,
        // la lógica para hashearla e insertarla iría aquí.
        // Dado que ActualizarUsuarioDTO no tiene 'password', no hacemos nada con la contraseña aquí.
        // La contraseña existente en 'existingUsuario' (cargada de la DB) se mantendrá.

        uS.update(existingUsuario); // Llama al servicio para actualizar (el servicio ya no hashea)
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        uS.delete(id);
    }

    @GetMapping("/{id}")
    public ActualizarUsuarioDTO buscarId(@PathVariable("id") int id){
        // El servicio devuelve la entidad Usuario, el controlador mapea a ActualizarUsuarioDTO
        ModelMapper m = new ModelMapper();
        Usuario usuario = uS.listId(id);
        return m.map(usuario, ActualizarUsuarioDTO.class);
    }

    @GetMapping("/busquedas")
    public List<UsuarioDTO> buscarPorUsuario(@RequestParam String nombre){
        return uS.buscar(nombre).stream().map(z->{
            ModelMapper m = new ModelMapper();
            return m.map(z, UsuarioDTO.class);
        }).collect(Collectors.toList());
    }
}
