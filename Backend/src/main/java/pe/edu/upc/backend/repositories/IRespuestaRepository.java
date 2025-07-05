package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Respuesta;

import java.util.List;

@Repository
public interface IRespuestaRepository extends JpaRepository<Respuesta, Integer> {
    @Query(value = "SELECT e.nombre_encuesta,COUNT(b.id_respuesta) FROM comentario a\n" +
            "INNER JOIN respuesta b\n" +
            "ON a.id_usuario = b.id_usuario\n" +
            "INNER JOIN encuesta_pregunta c\n" +
            "ON b.id_encuesta_pregunta = c.id_encuesta_pregunta\n" +
            "INNER JOIN pregunta d\n" +
            "ON c.id_pregunta = d.id_pregunta\n" +
            "INNER JOIN encuesta e\n" +
            "ON c.id_encuesta = e.id_encuesta\n" +
            "GROUP BY 1", nativeQuery = true)
    List<String[]> respuestaxNombreEncuesta();
}
