package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.EncuestaPreguntaDTO;
import pe.edu.upc.backend.entities.EncuestaPregunta;
import pe.edu.upc.backend.serviceinterfaces.IEncuestaPreguntaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/encuestasPreguntas")
@PreAuthorize("hasAuthority('ADMINISTRADOR')")
public class EncuestaPreguntaController {

    @Autowired
    private IEncuestaPreguntaService epS;

    @GetMapping("/listar")
    public List<EncuestaPreguntaDTO> listar(){
        return epS.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, EncuestaPreguntaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody EncuestaPreguntaDTO dto){
        ModelMapper m = new ModelMapper();
        EncuestaPregunta es = m.map(dto, EncuestaPregunta.class);
        epS.insert(es);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody EncuestaPreguntaDTO dto){
        ModelMapper m = new ModelMapper();
        EncuestaPregunta c = m.map(dto, EncuestaPregunta.class);
        epS.update(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        epS.eliminar(id);
    }

    @GetMapping("/{id}")
    public EncuestaPreguntaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        EncuestaPreguntaDTO dto =m.map(epS.listId(id), EncuestaPreguntaDTO.class);
        return dto;
    }
}
