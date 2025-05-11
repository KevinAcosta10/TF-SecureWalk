package pe.edu.upc.backend.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.PostDTO;
import pe.edu.upc.backend.dtos.PostPorIncidenteDTO;
import pe.edu.upc.backend.entities.Post;

import pe.edu.upc.backend.serviceinterfaces.IPostService;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/posts")
@PreAuthorize("hasAnyAuthority('Administrador', 'Usuario')")
public class PostController {
    @Autowired
    private IPostService pT;

    @GetMapping("/listar")
    public List<PostDTO> list() {
        return pT.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, PostDTO.class);
        }).collect(Collectors.toList());

    }
    @PostMapping("/insertar")
    public void insertar(@RequestBody PostDTO dto) {
        ModelMapper m = new ModelMapper();
        Post us = m.map(dto, Post.class);
        pT.insert(us);
    }
    @PutMapping("/modificar")
    public void modificar(@RequestBody PostDTO dto) {
        ModelMapper m = new ModelMapper();
        Post us = m.map(dto, Post.class);
        pT.update(us);

    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        pT.delete(id);
    }

    @GetMapping("/PostPorIncidente")
    public List<PostPorIncidenteDTO> ObtenerPostPorIncidente() {
        List<String[]> lista =pT.postPorIncidente();
        List<PostPorIncidenteDTO> listaDTO = new ArrayList<>();
        for(String[] columna : lista) {
            PostPorIncidenteDTO dto = new PostPorIncidenteDTO();
            dto.setIdPOst(Integer.parseInt(columna[0]));
            dto.setDescripcion((columna[1]));
            dto.setTipoIncidente(columna[2]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @GetMapping("/{id}")
    public PostDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        PostDTO dto =m.map(pT.listId(id), PostDTO.class);
        return dto;
    }
}


