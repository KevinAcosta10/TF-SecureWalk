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
@RequestMapping("/api/encuestas")
public class EncuestaController {

    @Autowired
    private IEncuestaService eR;

    @GetMapping("/listar")
    public List<EncuestaDTO> listar(){
        return eR.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, EncuestaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody EncuestaDTO dto){
        ModelMapper m = new ModelMapper();
        Encuesta es = m.map(dto, Encuesta.class);
        eR.insert(es);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody EncuestaDTO dto){
        ModelMapper m = new ModelMapper();
        Encuesta c = m.map(dto, Encuesta.class);
        eR.update(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        eR.eliminar(id);
    }

    @GetMapping("/{id}")
    public EncuestaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        EncuestaDTO dto =m.map(eR.listId(id), EncuestaDTO.class);
        return dto;
    }
}
