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

        Usuario existingUsuario = uS.listId(dto.getIdUsuario());

        existingUsuario.setNombreUsuario(dto.getNombreUsuario());
        existingUsuario.setEmailUsuario(dto.getEmailUsuario());
        existingUsuario.setTelefonoUsuario(dto.getTelefonoUsuario());
        existingUsuario.setDireccionUsuario(dto.getDireccionUsuario());
        existingUsuario.setFechaRegistroUsuario(dto.getFechaRegistroUsuario());
        existingUsuario.setUsername(dto.getUsername());
        existingUsuario.setEnable(dto.isEnable());

        uS.update(existingUsuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        uS.delete(id);
    }

    @GetMapping("/{id}")
    public ActualizarUsuarioDTO buscarId(@PathVariable("id") int id){
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
