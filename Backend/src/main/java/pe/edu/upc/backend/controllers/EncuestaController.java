package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.EncuestaDTO;
import pe.edu.upc.backend.entities.Encuesta;
import pe.edu.upc.backend.serviceinterfaces.IEncuestaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/encuestas")
public class EncuestaController {

    @Autowired
    private IEncuestaService eS;

    @GetMapping("/listas")
    public List<EncuestaDTO> listar(){
        return eS.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, EncuestaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insertar(@RequestBody EncuestaDTO dto){
        ModelMapper m = new ModelMapper();
        Encuesta es = m.map(dto, Encuesta.class);
        eS.insert(es);
    }
    @GetMapping("/{id}")
    public EncuestaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        EncuestaDTO dto =m.map(eS.listId(id), EncuestaDTO.class);
        return dto;
    }

}
