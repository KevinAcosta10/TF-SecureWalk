package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.ComentarioDTO;
import pe.edu.upc.backend.dtos.ComentarioPorUsuarioDTO;
import pe.edu.upc.backend.entities.Comentario;
import pe.edu.upc.backend.serviceinterfaces.IComentarioService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comentarios") //las puse /api a todas para mandarla al WebSecurityConfig y acceder sin autorizacion a todos los controllers
public class ComentarioController {
    @Autowired
    private IComentarioService cS;
    @GetMapping("/listar")
    public List<ComentarioDTO> listar() {
        return cS.list().stream().map(x ->{
            ModelMapper m = new ModelMapper();
            return m.map(x,ComentarioDTO.class);
        }).collect(Collectors.toList());
    }
    @PostMapping("/insertar")
    public void insertar(@RequestBody ComentarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Comentario c = m.map(dto, Comentario.class);
        cS.insert(c);
    }
    @PutMapping("/modificar")
    public void modificar(@RequestBody ComentarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Comentario c = m.map(dto, Comentario.class);
        cS.update(c);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        cS.delete(id);
    }

    @GetMapping("/ComentariosPorUsuario")
    public List<ComentarioPorUsuarioDTO> ComentarioPorUsuario() {
        List<String[]> lista = cS.TotalComentariosPorUsuario();
        List<ComentarioPorUsuarioDTO> comentariosDTO = new ArrayList<>();
        for (String[] columna : lista) {
            ComentarioPorUsuarioDTO dto = new ComentarioPorUsuarioDTO();
            dto.setIdUsuario(Integer.parseInt(columna[0]));
            dto.setNombreUsuario(columna[1]);
            dto.setTotalComentarios(Integer.parseInt(columna[2]));
            comentariosDTO.add(dto);
        }
        return comentariosDTO;
    }
    @GetMapping("/{id}")
    public ComentarioDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        ComentarioDTO dto =m.map(cS.listId(id), ComentarioDTO.class);
        return dto;
    }
}
