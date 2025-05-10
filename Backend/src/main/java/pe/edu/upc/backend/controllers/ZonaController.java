package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.CantidadIncidentesPorZonaDTO;
import pe.edu.upc.backend.dtos.ZonaDTO;
import pe.edu.upc.backend.entities.Zona;
import pe.edu.upc.backend.serviceinterfaces.IZonaService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/zonas")
public class ZonaController {
    @Autowired
    private IZonaService zS;

    @GetMapping("/listar")
    public List<ZonaDTO> listar() {
        return zS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ZonaDTO.class);
        }).collect((Collectors.toList()));
    }
    @PostMapping("/insertar")
    public void insertar(@RequestBody ZonaDTO dto) {
        ModelMapper m = new ModelMapper();
        Zona z = m.map(dto, Zona.class);
        zS.insert(z);
    }
    @PutMapping("/modificar")
    public void modificar(@RequestBody ZonaDTO dto) {
        ModelMapper m = new ModelMapper();
        Zona z = m.map(dto, Zona.class);
        zS.update(z);

    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        zS.delete(id);
    }

    @GetMapping("/cantidades")
    public List<CantidadIncidentesPorZonaDTO> ObtenerIncidentesPorZona() {
        List<String[]> lista =zS.cantidadIncidentes();
        List<CantidadIncidentesPorZonaDTO> listaDTO = new ArrayList<>();
        for(String[] columna : lista) {
            CantidadIncidentesPorZonaDTO dto = new CantidadIncidentesPorZonaDTO();
            dto.setNombreZona(columna[0]);
            dto.setTotalIncidentes(Integer.parseInt(columna[1]));
            listaDTO.add(dto);
        }
        return listaDTO;
    }
}
