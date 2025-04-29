package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.edu.upc.backend.entities.Rol;

import java.util.List;

public interface IRolRepository extends JpaRepository<Rol, Integer> {
    @Query(value = "SELECT u.nombre_usuario AS NombreUsuario, r.rol\n" +
            " FROM Rol r\n" +
            " JOIN Usuario u ON r.user_id = u.id_usuario;", nativeQuery = true)
    public List<String[]> UsuariosRol();
}
