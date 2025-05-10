package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.RutaDTO;
import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.serviceinterfaces.IRutaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rutas")
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

}