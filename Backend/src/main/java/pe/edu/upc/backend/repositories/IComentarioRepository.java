package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Comentario;

import java.util.List;

@Repository
public interface IComentarioRepository extends JpaRepository<Comentario, Integer> {
    @Query(value = "SELECT u.id_usuario, u.nombre_usuario, COUNT(r.id_comentario) AS cantidad_comentarios\n" +
            "FROM public.usuario u\n" +
            "LEFT JOIN public.comentario r ON u.id_usuario = r.id_comentario\n" +
            "GROUP BY u.id_usuario, u.nombre_usuario\n" +
            "ORDER BY cantidad_comentarios\n" +
            "DESC",nativeQuery = true)
    public List<String[]> TotalComentariosPorUsuario();

    @Query(value = "SELECT nombre_zona,COUNT(d.id_comentario) FROM zona a \n" +
            "INNER JOIN ruta b\n" +
            "ON a.id_zona = b.id_zona\n" +
            "INNER JOIN usuario_ruta c \n" +
            "ON b.id_ruta = c.id_ruta\n" +
            "INNER JOIN comentario d\n" +
            "ON c.id_usuario = d.id_usuario\n" +
            "GROUP BY 1", nativeQuery = true)
    List<String[]> nombreZonaxComentario();

    @Query(value = "SELECT d.tipo_pregunta,COUNT(a.id_comentario) FROM comentario a\n" +
            "INNER JOIN respuesta b\n" +
            "ON a.id_usuario = b.id_usuario\n" +
            "INNER JOIN encuesta_pregunta c\n" +
            "ON b.id_encuesta_pregunta = c.id_encuesta_pregunta\n" +
            "INNER JOIN pregunta d\n" +
            "ON c.id_pregunta = d.id_pregunta\n" +
            "GROUP BY 1", nativeQuery = true)
    List<String[]> comentarioxTipoPregunta();
}
