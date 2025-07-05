package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.edu.upc.backend.entities.UsuarioRuta;

import java.util.List;

public interface IUsuarioRutaRepository extends JpaRepository<UsuarioRuta, Integer> {
    @Query(value = "SELECT nombre_zona,COUNT(id_usuario) FROM ruta a \n" +
            "INNER JOIN usuario_ruta b\n" +
            "ON a.id_ruta = b.id_ruta\n" +
            "LEFT JOIN zona c \n" +
            "ON a.id_zona = c.id_zona\n" +
            "GROUP BY 1", nativeQuery = true)
    List<String[]> zonaxUsuario();
}
