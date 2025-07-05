package pe.edu.upc.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.EncuestaConPreguntasDTO;
import pe.edu.upc.backend.dtos.EncuestaPreguntaDTO;
import pe.edu.upc.backend.dtos.PreguntaDTO;
import pe.edu.upc.backend.entities.Encuesta;
import pe.edu.upc.backend.entities.EncuestaPregunta;
import pe.edu.upc.backend.entities.Pregunta;
import pe.edu.upc.backend.repositories.IEncuestaPreguntaRepository;
import pe.edu.upc.backend.serviceinterfaces.IEncuestaPreguntaService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/encuestasPreguntas")
public class EncuestaPreguntaController {
    @Autowired
    private IEncuestaPreguntaService epS;

    @Autowired // Necesario para usar findAllByOrderByEncuestaIdEncuestaAscOrdenAsc()
    private IEncuestaPreguntaRepository encuestaPreguntaRepository;

    @GetMapping("/listar")
    public List<EncuestaPreguntaDTO> listar() {
        return epS.list().stream().map(z -> {
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, EncuestaPreguntaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/insertar")
    public void insertar(@RequestBody EncuestaPreguntaDTO dto) {
        ModelMapper m = new ModelMapper();
        EncuestaPregunta es = m.map(dto, EncuestaPregunta.class);
        epS.insert(es);
    }

    @PutMapping("/modificar")
    public void modificar(@RequestBody EncuestaPreguntaDTO dto) {
        ModelMapper m = new ModelMapper();
        EncuestaPregunta c = m.map(dto, EncuestaPregunta.class);
        epS.update(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id) {
        epS.eliminar(id);
    }

    @GetMapping("/{id}")
    public EncuestaPreguntaDTO buscarId(@PathVariable("id") int id) {
        ModelMapper m = new ModelMapper();
        EncuestaPreguntaDTO dto = m.map(epS.listId(id), EncuestaPreguntaDTO.class);
        return dto;
    }

    @GetMapping("/por-encuesta/{id}")
    public List<EncuestaPreguntaDTO> obtenerPreguntasDeEncuesta(@PathVariable("id") int idEncuesta) {
        ModelMapper m = new ModelMapper();
        // 1. Llama al servicio que usa tu query para obtener las entidades EncuestaPregunta.
        // Gracias al LEFT JOIN FETCH en el repositorio, cada EncuestaPregunta tendrá
        // sus objetos Encuesta y Pregunta completamente cargados.
        List<EncuestaPregunta> listaRelaciones = epS.listarEncuestaPreguntas(idEncuesta);

        // 2. Mapea directamente la lista de entidades a una lista de EncuestaPreguntaDTO.
        // ModelMapper es inteligente y si los nombres de los campos coinciden (ej. 'encuesta' y 'pregunta'
        // tanto en la entidad como en el DTO, y dentro de ellos los campos como 'nombreEncuesta', 'textoPregunta'),
        // hará el mapeo anidado automáticamente.
        return listaRelaciones.stream()
                .map(relacion -> m.map(relacion, EncuestaPreguntaDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/agrupadas")
    public List<EncuestaConPreguntasDTO> listarEncuestasConPreguntasAgrupadas() {
        List<EncuestaPregunta> todasLasRelaciones = encuestaPreguntaRepository.findAllByOrderByEncuestaIdEncuestaAscOrdenAsc();

        Map<Encuesta, List<EncuestaPregunta>> groupedByEncuesta = todasLasRelaciones.stream()
                .collect(Collectors.groupingBy(EncuestaPregunta::getEncuesta));

        List<EncuestaConPreguntasDTO> resultado = new ArrayList<>();

        groupedByEncuesta.forEach((encuesta, relacionesDeEstaEncuesta) -> {
            EncuestaConPreguntasDTO encuestaDto = new EncuestaConPreguntasDTO();
            encuestaDto.setIdEncuesta(encuesta.getIdEncuesta());
            encuestaDto.setNombreEncuesta(encuesta.getNombreEncuesta());
            encuestaDto.setDescripcionEncuesta(encuesta.getDescripcionEncuesta());
            encuestaDto.setFechaCreacionEncuesta(encuesta.getFechaCreacionEncuesta());

            List<PreguntaDTO> preguntasDto = relacionesDeEstaEncuesta.stream()
                    .map(relacion -> {
                        Pregunta preguntaEntidad = relacion.getPregunta();
                        PreguntaDTO preguntaDto = new PreguntaDTO();
                        preguntaDto.setIdPregunta(preguntaEntidad.getIdPregunta());
                        preguntaDto.setTextoPregunta(preguntaEntidad.getTextoPregunta());
                        preguntaDto.setTipoPregunta(preguntaEntidad.getTipoPregunta());
                        // ¡CAMBIO CLAVE: Se elimina la asignación de 'orden'!
                        // preguntaDto.setOrden(relacion.getOrden());
                        return preguntaDto;
                    })
                    // ¡CAMBIO CLAVE: Se elimina el ordenamiento por 'orden'!
                    // .sorted(Comparator.comparing(PreguntaDTO::getOrden))
                    .collect(Collectors.toList());

            encuestaDto.setPreguntas(preguntasDto);
            resultado.add(encuestaDto);
        });

        resultado.sort(Comparator.comparing(EncuestaConPreguntasDTO::getIdEncuesta));

        return resultado;
    }
}