package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.*;
import pe.edu.upc.backend.entities.Respuesta;
import pe.edu.upc.backend.serviceinterfaces.IRespuestaService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {
    @Autowired
    private IRespuestaService rS;

    @GetMapping("/listar")
    @PreAuthorize("hasAnyAuthority('USUARIO','POLICIA', 'ADMINISTRADOR')")
    public List<RespuestaDTO> listar(){
        return rS.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, RespuestaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    @PreAuthorize("hasAnyAuthority('USUARIO','POLICIA', 'ADMINISTRADOR')")
    public void insertar(@RequestBody RespuestaDTO dto){
        ModelMapper m = new ModelMapper();
        Respuesta rs = m.map(dto, Respuesta.class);
        rS.insert(rs);
    }

    @PutMapping("/modificar")
    @PreAuthorize("hasAnyAuthority('USUARIO','POLICIA', 'ADMINISTRADOR')")
    public void modificar(@RequestBody RespuestaDTO dto){
        ModelMapper m = new ModelMapper();
        Respuesta c = m.map(dto, Respuesta.class);
        rS.update(c);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") int id) {
        rS.eliminar(id);
    }
    
    @GetMapping("/RespuestasXUsuario")
    public List<RespuestasXUsuarioDTO> RespuestasXUsuario(@RequestParam("idUsuario") int idUsuario) {
        List<String[]> lista = rS.RespuestasbyUsuario(idUsuario);
        List<RespuestasXUsuarioDTO> listaDTO = new ArrayList<>();
        for (String[] columna : lista) {
            RespuestasXUsuarioDTO dto = new RespuestasXUsuarioDTO();
            dto.setIdRespuesta(Integer.parseInt(columna[0]));
            dto.setTextoRespuesta(columna[1]);
            dto.setFechaRespuesta(LocalDate.parse(columna[2]));
            dto.setTextoPregunta(columna[3]);
            dto.setNombreEncuesta(columna[4]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public RespuestaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        RespuestaDTO dto =m.map(rS.listId(id), RespuestaDTO.class);
        return dto;
    }
}
