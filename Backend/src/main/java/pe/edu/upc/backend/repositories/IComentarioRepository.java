package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Comentario;

import java.util.List;

@Repository
public interface IComentarioRepository extends JpaRepository<Comentario, Integer> {
    @Query(value = "SELECT u.id_usuario, u.nombre_usuario, COUNT(r.id_comentario) AS cantidad_comentarios\n" +
            "FROM public.usuario u\n" +
            "LEFT JOIN public.comentario r ON u.id_usuario = r.id_comentario\n" +
            "GROUP BY u.id_usuario, u.nombre_usuario\n" +
            "ORDER BY cantidad_comentarios\n" +
            "DESC",nativeQuery = true)
    public List<String[]> TotalComentariosPorUsuario();
}
