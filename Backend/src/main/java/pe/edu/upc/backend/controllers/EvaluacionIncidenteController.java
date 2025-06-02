package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.EvaluacionIncidenteDTO;
import pe.edu.upc.backend.entities.EvaluacionIncidente;
import pe.edu.upc.backend.serviceinterfaces.IEvaluacionIncidenteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/evaluaciones")
@PreAuthorize("hasAnyAuthority('POLICIA','ADMINISTRADOR','USUARIO')")
public class EvaluacionIncidenteController {
    @Autowired
    private IEvaluacionIncidenteService eiR;

    @GetMapping("/listar")
    public List<EvaluacionIncidenteDTO> listar(){
        return eiR.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, EvaluacionIncidenteDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    @PreAuthorize("hasAnyAuthority('POLICIA','ADMINISTRADOR')")
    public void insertar(@RequestBody EvaluacionIncidenteDTO dto){
        ModelMapper m = new ModelMapper();
        EvaluacionIncidente eI = m.map(dto, EvaluacionIncidente.class);
        eiR.insert(eI);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('POLICIA','ADMINISTRADOR')")
    public EvaluacionIncidenteDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        EvaluacionIncidenteDTO dto =m.map(eiR.listId(id), EvaluacionIncidenteDTO.class);
        return dto;
    }

    @PutMapping("/modificar")
    @PreAuthorize("hasAnyAuthority('POLICIA','ADMINISTRADOR')")
    public void modificar(@RequestBody EvaluacionIncidenteDTO dto){
        ModelMapper m = new ModelMapper();
        EvaluacionIncidente eI = m.map(dto, EvaluacionIncidente.class);
        eiR.update(eI);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('POLICIA','ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") int id){eiR.delete(id);}

}
