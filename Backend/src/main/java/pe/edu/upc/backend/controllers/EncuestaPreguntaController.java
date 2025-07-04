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

    @GetMapping("/agrupadas") // Este es el endpoint que el frontend consumirá
    public List<EncuestaConPreguntasDTO> listarEncuestasConPreguntasAgrupadas() {

        // 1. Obtener todas las relaciones EncuestaPregunta de forma eficiente
        List<EncuestaPregunta> todasLasRelaciones = encuestaPreguntaRepository.findAllByOrderByEncuestaIdEncuestaAscOrdenAsc();

        // 2. Agrupar las relaciones por la entidad Encuesta (para la estructura final)
        Map<Encuesta, List<EncuestaPregunta>> groupedByEncuesta = todasLasRelaciones.stream()
                .collect(Collectors.groupingBy(EncuestaPregunta::getEncuesta));

        // 3. Preparar la lista final de DTOs
        List<EncuestaConPreguntasDTO> resultado = new ArrayList<>();

        // 4. Iterar sobre cada grupo y construir los DTOs manualmente
        groupedByEncuesta.forEach((encuesta, relacionesDeEstaEncuesta) -> {
            // Crear el DTO de la encuesta y copiar las propiedades manualmente
            EncuestaConPreguntasDTO encuestaDto = new EncuestaConPreguntasDTO();
            encuestaDto.setIdEncuesta(encuesta.getIdEncuesta());
            encuestaDto.setNombreEncuesta(encuesta.getNombreEncuesta());
            encuestaDto.setDescripcionEncuesta(encuesta.getDescripcionEncuesta());
            encuestaDto.setFechaCreacionEncuesta(encuesta.getFechaCreacionEncuesta()); // Asumiendo que el tipo es compatible

            // Crear la lista de PreguntaDTOs para esta encuesta
            List<PreguntaDTO> preguntasDto = relacionesDeEstaEncuesta.stream()
                    .map(relacion -> {
                        // Crear el DTO de la pregunta y copiar las propiedades manualmente
                        Pregunta preguntaEntidad = relacion.getPregunta();
                        PreguntaDTO preguntaDto = new PreguntaDTO();
                        preguntaDto.setIdPregunta(preguntaEntidad.getIdPregunta());
                        preguntaDto.setTextoPregunta(preguntaEntidad.getTextoPregunta());
                        preguntaDto.setTipoPregunta(preguntaEntidad.getTipoPregunta());
                        preguntaDto.setOrden(relacion.getOrden()); // El orden viene de la relación EncuestaPregunta
                        return preguntaDto;
                    })
                    .sorted(Comparator.comparing(PreguntaDTO::getOrden)) // Asegurar el orden final
                    .collect(Collectors.toList());

            encuestaDto.setPreguntas(preguntasDto); // Asignar las preguntas a la encuesta DTO
            resultado.add(encuestaDto); // Añadir la encuesta DTO completa a la lista final
        });

        // Opcional: Ordenar las encuestas por ID o algún otro criterio
        resultado.sort(Comparator.comparing(EncuestaConPreguntasDTO::getIdEncuesta));

        return resultado;
    }
}