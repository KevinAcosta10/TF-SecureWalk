package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Encuesta;

import java.util.List;


@Repository
public interface IEncuestaRepository extends JpaRepository<Encuesta, Integer> {
    @Query(value = "SELECT nombre_encuesta,COUNT(c.id_usuario) FROM zona a \n" +
            "INNER JOIN ruta b\n" +
            "ON a.id_zona = b.id_zona\n" +
            "INNER JOIN usuario_ruta c \n" +
            "ON b.id_ruta = c.id_ruta\n" +
            "INNER JOIN respuesta d\n" +
            "ON c.id_usuario = d.id_usuario\n" +
            "INNER JOIN encuesta_pregunta e\n" +
            "ON d.id_encuesta_pregunta = e.id_encuesta_pregunta\n" +
            "INNER JOIN encuesta f\n" +
            "ON e.id_encuesta = f.id_encuesta\n" +
            "GROUP BY 1\n", nativeQuery = true)
    List<String[]> nombreEncuestaxUsuario();
}
