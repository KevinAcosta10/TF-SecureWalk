package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Post;

import java.util.List;

@Repository
public interface IPostRepository extends JpaRepository<Post, Integer>{
    @Query(value = "SELECT p.idPost, p.descripcion, i.tipoIncidente, z.nombreZona \n" +
            " FROM incidente i\n" +
            " JOIN zona z ON i.id_zona = z.id_zona\n" +
            " GROUP BY z.nombre_zona;", nativeQuery = true)

    public List<String[]> postPorIncidente();
}
