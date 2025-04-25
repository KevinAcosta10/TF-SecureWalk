package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.RutaDTO;
import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.serviceinterfaces.IRutaService;
import pe.edu.upc.backend.serviceinterfaces.IUsuarioService;
/* import pe.edu.upc.backend.dtos.CrearRutaDTO;*/

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rutas")
public class RutaController {
    @Autowired
    private IRutaService rS;

    @GetMapping
    public List<Ruta> listar() {
        return rS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,Ruta.class);
        }).collect(Collectors.toList());
    }

}