package pe.edu.upc.backend.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.PreguntaDTO;
import pe.edu.upc.backend.entities.Pregunta;
import pe.edu.upc.backend.serviceinterfaces.IPreguntaService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/preguntas")
@PreAuthorize("hasAuthority('ADMINISTRADOR')")
public class PreguntaController {
    @Autowired
    private IPreguntaService pS;

    @GetMapping("/listar")
    public List<PreguntaDTO> list() {
        return pS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, PreguntaDTO.class);
        }).collect(Collectors.toList());

    }
    @PostMapping("/insertar")
    public void insertar(@RequestBody PreguntaDTO dto) {
        ModelMapper m = new ModelMapper();
        Pregunta us = m.map(dto, Pregunta.class);
        pS.insert(us);
    }
    @PutMapping("/modificar")
    public void modificar(@RequestBody PreguntaDTO dto) {
        ModelMapper m = new ModelMapper();
        Pregunta us = m.map(dto, Pregunta.class);
        pS.update(us);

    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        pS.delete(id);
    }
    @GetMapping("/{id}")
    public PreguntaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        PreguntaDTO dto =m.map(pS.listId(id), PreguntaDTO.class);
        return dto;
    }
}
