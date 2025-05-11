package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upc.backend.entities.Rol;

import java.util.List;

public interface IRolRepository extends JpaRepository<Rol, Integer> {
    @Query(value = "SELECT u.id_usuario, u.nombre_usuario, r.nombre_rol\n" +
            "FROM public.usuario u\n" +
            "JOIN public.rol r ON u.id_usuario = r.id_usuario\n" +
            "WHERE r.id_rol = :id", nativeQuery = true)
    public List<String[]> UsuariosRol(@Param("id") int id);
}
