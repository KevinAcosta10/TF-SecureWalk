package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Ruta;

import java.util.List;

@Repository
public interface IRutaRepository extends JpaRepository<Ruta, Integer> {

    @Query(
            value = "SELECT CAST(r.UsuarioRuta AS CHAR), COUNT(r.RutaID) \n" +
                    "  FROM Ruta r \n" +
                    " GROUP BY r.UsuarioRuta",
            nativeQuery = true
    )
    List<String[]> countRutasByUsuario();
}

