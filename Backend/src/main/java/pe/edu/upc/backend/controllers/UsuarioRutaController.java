package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.UsuarioRutaDTO;
import pe.edu.upc.backend.dtos.zonaxUsuario;
import pe.edu.upc.backend.entities.UsuarioRuta;
import pe.edu.upc.backend.serviceinterfaces.IUsuarioRutaService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarioRutas")
public class UsuarioRutaController {
    @Autowired
    private IUsuarioRutaService urS;

    @GetMapping("/listar")
    public List<UsuarioRutaDTO> listar() {
        return urS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, UsuarioRutaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody UsuarioRutaDTO dto) {
        ModelMapper m = new ModelMapper();
        UsuarioRuta us = m.map(dto, UsuarioRuta.class);
        urS.insert(us);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody UsuarioRutaDTO dto) {
        ModelMapper m = new ModelMapper();
        UsuarioRuta us = m.map(dto, UsuarioRuta.class);
        urS.update(us);

    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        urS.delete(id);
    }

    @GetMapping("/{id}")
    public UsuarioRutaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        UsuarioRutaDTO dto =m.map(urS.listId(id), UsuarioRutaDTO.class);
        return dto;
    }

    @GetMapping("/zonaxUsuario")
    public List<zonaxUsuario> consulta01() {
        List<String[]> filaLista = urS.zonaxUsuario();
        List<zonaxUsuario> dtoLista = new ArrayList<>();
        for (String[] columna : filaLista) {
            zonaxUsuario dto = new zonaxUsuario();
            dto.setNombreZona(columna[0]);
            dto.setCantUsuario(Integer.parseInt(columna[1]));
            dtoLista.add(dto);
        }
        return dtoLista;
    }
}

