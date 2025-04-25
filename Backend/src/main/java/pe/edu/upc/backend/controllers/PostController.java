package pe.edu.upc.backend.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.PostDTO;
import pe.edu.upc.backend.entities.Post;

import pe.edu.upc.backend.serviceinterfaces.IPostService;


import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private IPostService pT;

    @GetMapping
    public List<PostDTO> list() {
        return pT.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, PostDTO.class);
        }).collect(Collectors.toList());

    }
    @PostMapping
    public void insertar(@RequestBody PostDTO dto) {
        ModelMapper m = new ModelMapper();
        Post us = m.map(dto, Post.class);
        pT.insert(us);
    }
    @PutMapping
    public void modificar(@RequestBody PostDTO dto) {
        ModelMapper m = new ModelMapper();
        Post us = m.map(dto, Post.class);
        pT.update(us);

    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        pT.delete(id);
    }
}


