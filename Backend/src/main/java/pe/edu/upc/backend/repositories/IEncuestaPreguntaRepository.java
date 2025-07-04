package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.EncuestaPregunta;

import java.util.List;

@Repository
public interface IEncuestaPreguntaRepository extends JpaRepository<EncuestaPregunta, Integer> {
    @Query("SELECT ep FROM EncuestaPregunta ep " +
            "LEFT JOIN FETCH ep.encuesta e " + // Carga ansiosa la entidad Encuesta
            "LEFT JOIN FETCH ep.pregunta p " + // Carga ansiosa la entidad Pregunta
            "WHERE e.idEncuesta = :idEncuesta " +
            "ORDER BY ep.orden ASC")
        // Asegura que la lista esté ordenada
    List<EncuestaPregunta> listarEncuestaPreguntas(@Param("idEncuesta") int idEncuesta);

    @Query("SELECT ep FROM EncuestaPregunta ep " +
            "LEFT JOIN FETCH ep.encuesta e " +
            "LEFT JOIN FETCH ep.pregunta p " +
            "ORDER BY e.idEncuesta ASC, ep.orden ASC")
    List<EncuestaPregunta> findAllByOrderByEncuestaIdEncuestaAscOrdenAsc();
}
