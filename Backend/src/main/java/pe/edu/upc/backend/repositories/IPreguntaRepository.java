package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Pregunta;

import java.util.List;

@Repository
public interface IPreguntaRepository extends JpaRepository<Pregunta, Integer>{

    @Query(value = "SELECT p.texto_pregunta, p.tipo_pregunta, e.nombre " +
            "FROM pregunta p " +
            "JOIN encuesta_pregunta ep ON p.id_pregunta = ep.id_pregunta " +
            "JOIN encuesta e ON ep.id_encuesta = e.id_encuesta", nativeQuery = true)
    List<String[]> obtenerPreguntasConEncuesta();

    @Query(value = "SELECT tipo_pregunta,COUNT(id_pregunta) FROM pregunta\n" +
            "GROUP BY 1", nativeQuery = true)
    List<String[]> tipoPreguntaxPregunta();
}
