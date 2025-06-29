package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Usuario;

import java.util.List;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
public Usuario findOneByUsername(String username);

    @Query("Select u from Usuario u where u.nombreUsuario like %:nUsuario%")
    public List<Usuario> buscarUsuario(@Param("nUsuario") String nUsuario);
}
