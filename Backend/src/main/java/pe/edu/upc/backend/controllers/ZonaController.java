package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.*;
import pe.edu.upc.backend.entities.Zona;
import pe.edu.upc.backend.serviceinterfaces.IZonaService;

import java.time.LocalTime;
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
    @GetMapping("/listarCoordenadas") // <--- Aquí está la nueva ruta
    public List<ZonaDTO> listarCoordenadas() {
        // Reutiliza la lógica de listar, ya que ZonaDTO ya tiene las coordenadas
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

    @GetMapping("/IncidentesPorZona")
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
    @GetMapping("/RutasPorZona")
    public List<ZonaRutasCountDTO> NumerodeRutasPorZona() {
        List<String[]> lista =zS.countRutasByZona();
        List<ZonaRutasCountDTO> listaDTO = new ArrayList<>();
        for(String[] columna : lista) {
            ZonaRutasCountDTO dto = new ZonaRutasCountDTO();
            dto.setNombreZona(columna[0]);
            dto.setCantidadRutas(Integer.parseInt(columna[1]));
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @GetMapping("/SeguridadPorZona")
    public List<SeguridadPorZonaDTO> SeguridadPorZona(@RequestParam("zona") String zona) {
        List<String[]> lista =zS.SeguridadPorZona(zona);
        List<SeguridadPorZonaDTO> listaDTO = new ArrayList<>();
        for(String[] columna : lista) {
            SeguridadPorZonaDTO dto = new SeguridadPorZonaDTO();
            dto.setNombreZona(columna[0]);
            dto.setHoraInicio(LocalTime.parse(columna[1]));
            dto.setHoraFin(LocalTime.parse(columna[2]));
            dto.setNivelSeguridad(columna[3]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @GetMapping("/{id}")
    public ZonaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        ZonaDTO dto =m.map(zS.listId(id), ZonaDTO.class);
        return dto;
    }

    @GetMapping("/nombreZonaxAprobacion")
    public List<NombreZonaxAprobacionDTO> consulta01() {
        List<String[]> filaLista = zS.nombreZonaxAprobacion();
        List<NombreZonaxAprobacionDTO> dtoLista = new ArrayList<>();
        for (String[] columna : filaLista) {
            NombreZonaxAprobacionDTO dto = new NombreZonaxAprobacionDTO();
            dto.setNombre_zona(columna[0]);
            dto.setCantAprobacion(Integer.parseInt(columna[1]));
            dtoLista.add(dto);
        }
        return dtoLista;
    }
}
