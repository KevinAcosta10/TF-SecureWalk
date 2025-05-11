package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Post;

import java.util.List;

@Repository
public interface IPostRepository extends JpaRepository<Post, Integer>{
    @Query(value = "SELECT p.id_post, p.descripcion_post, i.tipo_incidente\n" +
            "FROM post p\n" +
            "INNER JOIN incidente i ON i.id_usuario = p.id_usuario\n" +
            "GROUP BY p.id_post, i.tipo_incidente", nativeQuery = true)

    public List<String[]> postPorIncidente();
}
