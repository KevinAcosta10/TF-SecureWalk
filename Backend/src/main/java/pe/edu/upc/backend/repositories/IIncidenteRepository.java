package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.dtos.IncidentesPorUsuarioDTO;
import pe.edu.upc.backend.entities.Incidente;

import java.util.List;

@Repository
public interface IIncidenteRepository extends JpaRepository<Incidente, Integer> {


    @Query(value = "SELECT tipo_incidente,COUNT(a.id_usuario) FROM incidente a\n" +
            "INNER JOIN usuario b\n" +
            "ON a.id_usuario = b.id_usuario\n" +
            "LEFT JOIN zona c\n" +
            "ON a.id_zona = c.id_zona\n" +
            "GROUP BY 1", nativeQuery = true)
    List<String[]> tipoIncidentexUsuario();
}
