package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Zona;

import java.util.List;

@Repository
public interface IZonaRepository extends JpaRepository<Zona, Integer> {

    @Query(value = "SELECT z.nombre_zona, COUNT(i.id_incidente) AS total_incidentes\n" +
            " FROM incidente i\n" +
            " JOIN zona z ON i.id_zona = z.id_zona\n" +
            " GROUP BY z.nombre_zona;", nativeQuery = true)

    public List<String[]> cantidadIncidentes();;

    @Query(
            value = "SELECT z.nombre_zona, COUNT(r.id_ruta) as NumeroRutas\n" +
                    "FROM Zona z\n" +
                    "LEFT JOIN Ruta r \n" +
                    "ON z.id_zona = r.id_zona\n" +
                    "GROUP BY z.nombre_zona",
            nativeQuery = true
    )
    public List<String[]> countRutasByZona();
    @Query(value = "SELECT z.nombre_zona, r.hora_inicio, r.hora_fin, r.nivel_seguridad\n" +
            "FROM ruta r\n" +
            "INNER JOIN zona z ON z.id_zona = r.id_zona\n" +
            "where z.nombre_zona = :zona", nativeQuery = true)
    public List<String[]> SeguridadPorZona(@Param("zona") String zona);
}
