package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.RutaDTO;
import pe.edu.upc.backend.dtos.UsuarioRutaDTO;
import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.serviceinterfaces.IRutaService;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rutas")
@PreAuthorize("hasAnyAuthority('Administrador', 'Usuario')")

public class RutaController {
    @Autowired
    private IRutaService rS;

    @GetMapping("/listar")
    public List<RutaDTO> listar() {
        return rS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,RutaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody RutaDTO dto) {
        ModelMapper m = new ModelMapper();
        Ruta r = m.map(dto, Ruta.class);
        rS.insert(r);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody RutaDTO dto) {
        ModelMapper m = new ModelMapper();
        Ruta r = m.map(dto, Ruta.class);
        rS.update(r);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        rS.delete(id);
    }

    @GetMapping("/RutasPorUsuario")
    public List<UsuarioRutaDTO> RutasxUsuario(@RequestParam("id") int id) {
        List<String[]> lista = rS.rutasAsiganasaUsuario(id);
        List<UsuarioRutaDTO> listaDTO = new ArrayList<>();
        for (String[] columna : lista) {
            UsuarioRutaDTO dto = new UsuarioRutaDTO();
            dto.setIdRuta(Integer.parseInt(columna[0]));
            dto.setHoraInicio(LocalTime.parse(columna[1]));
            dto.setHoraFin(LocalTime.parse(columna[2]));
            dto.setNivelSeguridad(Integer.parseInt(columna[3]));
            dto.setNombreZona(columna[4]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @GetMapping("/{id}")
    public RutaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        RutaDTO dto =m.map(rS.listById(id), RutaDTO.class);
        return dto;
    }
}