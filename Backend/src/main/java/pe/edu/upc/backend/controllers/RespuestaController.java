package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.RespuestaDTO;
import pe.edu.upc.backend.entities.Respuesta;
import pe.edu.upc.backend.serviceinterfaces.IRespuestaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {
    @Autowired
    private IRespuestaService rR;

    @GetMapping("/listar")
    public List<RespuestaDTO> listar(){
        return rR.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, RespuestaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/registrar")
    public void insertar(@RequestBody RespuestaDTO dto){
        ModelMapper m = new ModelMapper();
        Respuesta rs = m.map(dto, Respuesta.class);
        rR.insert(rs);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody RespuestaDTO dto){
        ModelMapper m = new ModelMapper();
        Respuesta c = m.map(dto, Respuesta.class);
        rR.update(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        rR.eliminar(id);
    }
}
