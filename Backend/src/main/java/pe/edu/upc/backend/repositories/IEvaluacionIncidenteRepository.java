package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.EvaluacionIncidente;

import java.util.List;

@Repository
public interface IEvaluacionIncidenteRepository extends JpaRepository<EvaluacionIncidente, Integer> {
    @Query(value = "SELECT aprobacion_incidente,COUNT(d.id_usuario) FROM zona a \n" +
            "INNER JOIN ruta b\n" +
            "ON a.id_zona = b.id_zona\n" +
            "INNER JOIN usuario_ruta c \n" +
            "ON b.id_ruta = c.id_ruta\n" +
            "INNER JOIN evaluacion_incidente d\n" +
            "ON c.id_usuario = d.id_usuario\n" +
            "GROUP BY 1", nativeQuery = true)
    List<String[]> aprobacionIncidentexUsuario();
}
