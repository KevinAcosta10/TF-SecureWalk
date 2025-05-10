package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Post;

@Repository
public interface IPostRepository extends JpaRepository<Post, Integer>{
    //@Query(value = "SELECT u.id_Usuario, u.nombre_usuario AS NombreUsuario, r.rol, p.descripcion_post AS UltimoPost, c.descripcion_comentario AS UltimoComentario\n" +
    //        " FROM Usuario u\n" +
    //        " INNER JOIN Rol r ON u.id_usuario = r.user_id\n" +
    //        " LEFT JOIN Post p ON u.id_usuario = p.id_usuario\n" +
     //       " LEFT JOIN Comentario c ON u.id_usuario = c.usuarioid\n" +
       //     " WHERE u.id_usuario = :id\n" +
         //   " ORDER BY p.id_post DESC, c.id_comentario DESC\n" +
           // " LIMIT 1;" )
}
