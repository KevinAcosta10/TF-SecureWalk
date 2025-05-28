package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upc.backend.entities.Respuesta;

import java.util.List;

public interface IRespuestaRepository extends JpaRepository<Respuesta, Integer> {
    @Query(value = "SELECT r.id_respuesta, r.texto_respuesta, p.texto_pregunta, e.nombre_encuesta\n" +
            "FROM respuesta r\n" +
            "INNER JOIN encuesta_pregunta ep ON r.id_encuesta_pregunta = ep.id_encuesta_pregunta\n" +
            "INNER JOIN pregunta p ON ep.id_pregunta = p.id_pregunta\n" +
            "INNER JOIN encuesta e ON ep.id_encuesta = e.id_encuesta\n" +
            "WHERE r.id_usuario = :idUsuario\n" +
            "AND e.id_encuesta = :idEncuesta", nativeQuery = true)
    public List<String[]> RespuestasUsuarioEnEncuesta(@Param("idUsuario") int idUsuario, @Param("idEncuesta") int idEncuesta);

    @Query(value = "SELECT r.id_respuesta, r.texto_respuesta, r.fecha_respuesta, ep.id_pregunta, ep.id_encuesta\n" +
            "FROM Respuesta r\n" +
            "INNER JOIN encuesta_pregunta ep ON r.id_encuesta_pregunta = ep.id_encuesta_pregunta\n" +
            "WHERE r.id_usuario = :idUsuario", nativeQuery = true)
    public List<String[]> RespuestasbyUsuario(@Param("idUsuario") int idUsuario);
}
