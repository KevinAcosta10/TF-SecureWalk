package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.dtos.CantidadIncidentesPorZona;
import pe.edu.upc.backend.entities.Incidente;

import java.util.List;

@Repository
public interface IIncidenteRepository extends JpaRepository<Incidente, Integer> {

    @Query(value = "SELECT z.nombre_zona, COUNT(i.id_incidente) AS total_incidentes\n" +
            "FROM incidente i\n" +
            "JOIN zona z ON z.id_zona = z.id_zona\n" +
            "GROUP BY z.nombre_zona;", nativeQuery = true)
    public List<CantidadIncidentesPorZona> getIncidentesPorZona();
}
