package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.IncidenteDTO;
import pe.edu.upc.backend.dtos.IncidentesPorUsuarioDTO;
import pe.edu.upc.backend.entities.Incidente;
import pe.edu.upc.backend.serviceinterfaces.IIncidenteService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/incidentes")
public class IncidenteController {
    @Autowired
    private IIncidenteService iS;

    @GetMapping("/listar")
    public List<IncidenteDTO> listar() {
        return iS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            m.map(x, IncidenteDTO.class);
            return m.map(x, IncidenteDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody IncidenteDTO incidenteDTO) {
        ModelMapper m = new ModelMapper();
        Incidente incidente = m.map(incidenteDTO, Incidente.class);
        iS.insert(incidente);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody IncidenteDTO dto){
        ModelMapper m = new ModelMapper();
        Incidente c = m.map(dto, Incidente.class);
        iS.update(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        iS.delete(id);
    }

    @GetMapping("/incidentesPorUsuario")
    public List<IncidentesPorUsuarioDTO> IncidentesUsuarios(){
        List<String[]> lista = iS.IncidentesPorUsuario();
        List<IncidentesPorUsuarioDTO> listaDTO= new ArrayList<>();
        for (String[] columna : lista) {
            IncidentesPorUsuarioDTO dto = new IncidentesPorUsuarioDTO();
            dto.setIdIncidente(Long.parseLong(columna[0]));
            dto.setDescripcionIncidente(columna[1]);
            dto.setFechaIncidente(LocalDate.parse(columna[2]));
            dto.setTipoIncidente(columna[3]);
            dto.setIdUsuario(Long.parseLong(columna[4]));
            dto.setNombreUsuario(columna[5]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @GetMapping("/{id}")
    public IncidenteDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        IncidenteDTO dto =m.map(iS.listId(id), IncidenteDTO.class);
        return dto;
    }
}
