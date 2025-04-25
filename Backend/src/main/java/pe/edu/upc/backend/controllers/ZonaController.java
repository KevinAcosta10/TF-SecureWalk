package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upc.backend.dtos.ZonaDTO;
import pe.edu.upc.backend.serviceinterfaces.IZonaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/zonas")
public class ZonaController {

    @Autowired
    private IZonaService zS;

    @GetMapping
    public List<ZonaDTO> listar(){
        return zS.list().stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x, ZonaDTO.class);
        }).collect((Collectors.toList()));
    }
}
