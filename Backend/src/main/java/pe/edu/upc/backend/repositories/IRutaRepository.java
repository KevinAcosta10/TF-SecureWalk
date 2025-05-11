package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Ruta;

import java.util.List;

@Repository
public interface IRutaRepository extends JpaRepository<Ruta, Integer> {

    @Query(
            value = "SELECT r.id_ruta, r.hora_inicio, r.hora_fin, r.nivel_seguridad, z.nombre_zona\n" +
                    "FROM usuario_ruta ur\n" +
                    "INNER JOIN ruta r ON ur.id_ruta = r.id_ruta\n" +
                    "INNER JOIN zona z ON r.id_zona = z.id_zona\n" +
                    "WHERE ur.id_usuario = :id", nativeQuery = true)
    List<String[]> rutasAsiganasaUsuario(@Param("id") int id);
}

