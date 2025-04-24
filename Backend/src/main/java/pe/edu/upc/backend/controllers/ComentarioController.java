package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.ComentarioDTO;
import pe.edu.upc.backend.entities.Comentario;
import pe.edu.upc.backend.serviceinterfaces.IComentarioService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comentarios")
public class ComentarioController {
    @Autowired
    private IComentarioService cS;
    @GetMapping
    public List<ComentarioDTO> listar() {
        return cS.list().stream().map(x ->{
            ModelMapper m = new ModelMapper();
            return m.map(x,ComentarioDTO.class);
        }).collect(Collectors.toList());
    }
    @PostMapping
    public void insertar(@RequestBody ComentarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Comentario c = m.map(dto, Comentario.class);
        cS.insert(c);
    }
    @PutMapping
    public void modificar(@RequestBody ComentarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Comentario c = m.map(dto, Comentario.class);
        cS.update(c);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        cS.delete(id);
    }

}
