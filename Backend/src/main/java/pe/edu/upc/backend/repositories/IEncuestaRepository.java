package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.backend.entities.Encuesta;

public interface IEncuestaRepository extends JpaRepository<Encuesta, Integer> {
}
