package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.backend.entities.Respuesta;

public interface IRespuestaRepository extends JpaRepository<Respuesta, Integer> {
}
