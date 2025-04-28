package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Encuesta;

import java.util.List;

@Repository
public interface IEncuestaRepository extends JpaRepository<Encuesta, Integer> {

    @Query(value = "SELECT u.nombre_usuario, COUNT(e.id_encuesta) AS total_encuestas " +
            "FROM encuesta e " +
            "JOIN usuario u ON e.id_usuario = u.id_usuario " +
            "WHERE e.completada = true " +
            "GROUP BY u.nombre_usuario", nativeQuery = true)

    public List<String[]> cantidadEncuestasCompletadas();
}
