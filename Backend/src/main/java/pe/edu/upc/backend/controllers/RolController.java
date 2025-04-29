package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upc.backend.dtos.RolDTO;
import pe.edu.upc.backend.dtos.UsuarioRolDTO;
import pe.edu.upc.backend.serviceinterfaces.IRolService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RolController {
    @Autowired
    private IRolService rS;

    @GetMapping
    private List<RolDTO> listar() {

        return rS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RolDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/UsuarioRol")
    public List<UsuarioRolDTO> UsuarioRol() {
        List<String[]> lista = rS.UsuariosRol();
        List<UsuarioRolDTO> listaDTO = new ArrayList<>();
        for (String[] columna : lista) {
            UsuarioRolDTO dto = new UsuarioRolDTO();
            dto.setNombreUsuario(columna[0]);
            dto.setNombreRol(columna[1]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }

}
