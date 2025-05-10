package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.RolDTO;
import pe.edu.upc.backend.dtos.RutaDTO;
import pe.edu.upc.backend.dtos.UsuarioRolDTO;
import pe.edu.upc.backend.entities.Rol;
import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.serviceinterfaces.IRolService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RolController {
    @Autowired
    private IRolService rS;

    @GetMapping("/listar")
    private List<RolDTO> listar() {

        return rS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RolDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody RolDTO dto) {
        ModelMapper m = new ModelMapper();
        Rol r = m.map(dto, Rol.class);
        rS.insert(r);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody RolDTO dto) {
        ModelMapper m = new ModelMapper();
        Rol r = m.map(dto, Rol.class);
        rS.update(r);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        rS.delete(id);
    }

    @GetMapping("/UsuarioRol")
    public List<UsuarioRolDTO> UsuarioRol() {
        List<String[]> lista = rS.UsuariosRol();
        List<UsuarioRolDTO> listaDTO = new ArrayList<>();
        for (String[] columna : lista) {
            UsuarioRolDTO dto = new UsuarioRolDTO();
            dto.setNombreUsuario(columna[0]);
            dto.setDireccionUsuario(columna[1]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }

}
