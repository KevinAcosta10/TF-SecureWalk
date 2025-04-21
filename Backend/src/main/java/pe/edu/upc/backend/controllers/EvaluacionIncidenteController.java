package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.EvaluacionIncidenteDTO;
import pe.edu.upc.backend.entities.EvaluacionIncidente;
import pe.edu.upc.backend.serviceinterfaces.IEvaluacionIncidenteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/evaluaciones")
public class EvaluacionIncidenteController {
    @Autowired
    private IEvaluacionIncidenteService eIR;

    @GetMapping("/listas")
    public List<EvaluacionIncidenteDTO> listar(){
        return eIR.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, EvaluacionIncidenteDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insertar(@RequestBody EvaluacionIncidenteDTO dto){
        ModelMapper m = new ModelMapper();
        EvaluacionIncidente eI = m.map(dto, EvaluacionIncidente.class);
        eIR.insert(eI);
    }
    @GetMapping("/{id}")
    public EvaluacionIncidenteDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        EvaluacionIncidenteDTO dto =m.map(eIR.listId(id), EvaluacionIncidenteDTO.class);
        return dto;
    }

    @PutMapping
    public void modificar(@RequestBody EvaluacionIncidenteDTO dto){
        ModelMapper m = new ModelMapper();
        EvaluacionIncidente eI = m.map(dto, EvaluacionIncidente.class);
        eIR.update(eI);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        eIR.delete(id);
    }
}
