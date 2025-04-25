package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.CantidadIncidentesPorZona;
import pe.edu.upc.backend.dtos.IncidenteDTO;
import pe.edu.upc.backend.entities.Incidente;
import pe.edu.upc.backend.serviceinterfaces.IIncidenteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/incidentes")
public class IncidenteController {
    @Autowired
    private IIncidenteService iS;

    @PutMapping
    public void agregar(@RequestBody IncidenteDTO incidenteDTO) {
        ModelMapper m = new ModelMapper();
        Incidente incidente = m.map(incidenteDTO, Incidente.class);
        iS.insert(incidente);
    }

    @GetMapping
    public List<IncidenteDTO> listar() {
        return iS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            m.map(x, IncidenteDTO.class);
            return m.map(x, IncidenteDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping
    public List<CantidadIncidentesPorZona> getIncidentesPorZona() {
        return iS.getIncidentesPorZona().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, CantidadIncidentesPorZona.class);
        }).collect(Collectors.toList());
    }
}
