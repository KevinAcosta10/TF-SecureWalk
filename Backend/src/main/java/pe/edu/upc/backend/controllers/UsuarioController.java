package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.UsuarioDTO;
import pe.edu.upc.backend.dtos.UsuarioRolDTO;
import pe.edu.upc.backend.entities.Usuario;
import pe.edu.upc.backend.serviceinterfaces.IUsuarioService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService uS;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/listar")
    public List<UsuarioRolDTO> listar() {
        return uS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, UsuarioRolDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody UsuarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Usuario us = m.map(dto, Usuario.class);
        String encodedPassword = passwordEncoder.encode(us.getPassword());
        us.setPassword(encodedPassword);
        uS.insert(us);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody UsuarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Usuario us = m.map(dto, Usuario.class);
        uS.update(us);

    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        uS.delete(id);
    }

    @GetMapping("/{id}")
    public UsuarioDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        UsuarioDTO dto =m.map(uS.listId(id), UsuarioDTO.class);
        return dto;
    }
}
