package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.backend.entities.Rol;

public interface IRolRepository extends JpaRepository<Rol, Integer> {
}
