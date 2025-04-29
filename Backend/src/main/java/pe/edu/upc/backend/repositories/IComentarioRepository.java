package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Comentario;

import java.util.List;

@Repository
public interface IComentarioRepository extends JpaRepository<Comentario, Integer> {
    @Query(value = " SELECT u.nombre_usuario AS Nombre, COUNT(*) AS TotalComentarios\n" +
            " FROM Comentario c\n" +
            " INNER JOIN Usuario u ON c.UsuarioID = u.id_usuario\n" +
            " GROUP BY u.nombre_usuario\n" +
            " ORDER BY TotalComentarios DESC;",nativeQuery = true)
    public List<String[]> IncidentesPorUsuario();
}
