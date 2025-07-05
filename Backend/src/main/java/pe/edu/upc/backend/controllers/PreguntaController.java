package pe.edu.upc.backend.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.PreguntaDTO;
import pe.edu.upc.backend.dtos.TipoPreguntaxPreguntaDTO;
import pe.edu.upc.backend.entities.Pregunta;
import pe.edu.upc.backend.serviceinterfaces.IPreguntaService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/preguntas")
public class PreguntaController {
    @Autowired
    private IPreguntaService pS;

    @GetMapping("/listar")
    public List<PreguntaDTO> list() {
        return pS.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, PreguntaDTO.class);
        }).collect(Collectors.toList());

    }
    @PostMapping("/insertar")
    public void insertar(@RequestBody PreguntaDTO dto) {
        ModelMapper m = new ModelMapper();
        Pregunta us = m.map(dto, Pregunta.class);
        pS.insert(us);
    }
    @PutMapping("/modificar")
    public void modificar(@RequestBody PreguntaDTO dto) {
        ModelMapper m = new ModelMapper();
        Pregunta us = m.map(dto, Pregunta.class);
        pS.update(us);
    }

    @GetMapping("/{id}")
    public PreguntaDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        PreguntaDTO dto =m.map(pS.listId(id), PreguntaDTO.class);
        return dto;
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        pS.delete(id);
    }

    @GetMapping("/tipoPreguntaxPregunta")
    public List<TipoPreguntaxPreguntaDTO> consulta01() {
        List<String[]> filaLista = pS.tipoPreguntaxPregunta();
        List<TipoPreguntaxPreguntaDTO> dtoLista = new ArrayList<>();
        for (String[] columna : filaLista) {
            TipoPreguntaxPreguntaDTO dto = new TipoPreguntaxPreguntaDTO();
            dto.setTipoPregunta(columna[0]);
            dto.setCantPregunta(Integer.parseInt(columna[1]));
            dtoLista.add(dto);
        }
        return dtoLista;
    }
}
