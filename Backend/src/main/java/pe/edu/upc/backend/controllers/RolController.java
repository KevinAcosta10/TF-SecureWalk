package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.RolDTO;
import pe.edu.upc.backend.dtos.UsuarioRolDTO;
import pe.edu.upc.backend.dtos.UsuariosXRolDTO;
import pe.edu.upc.backend.entities.Rol;
import pe.edu.upc.backend.serviceinterfaces.IRolService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
@PreAuthorize("hasAuthority('ADMINISTRADOR')")

public class RolController {
    @Autowired
    private IRolService rS;

    @GetMapping("/listar")
    public List<RolDTO> listar() {
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
    public List<UsuariosXRolDTO> UsuarioRol(@RequestParam("id") int id) {
        List<String[]> lista = rS.UsuariosRol(id);
        List<UsuariosXRolDTO> listaDTO = new ArrayList<>();
        for (String[] columna : lista) {
            UsuariosXRolDTO dto = new UsuariosXRolDTO();
            dto.setIdUsuario(Integer.parseInt(columna[0]));
            dto.setNombreUsuario(columna[1]);
            dto.setNombreRol(columna[2]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @GetMapping("/{id}")
    public RolDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        RolDTO dto =m.map(rS.listById(id), RolDTO.class);
        return dto;
    }

}
