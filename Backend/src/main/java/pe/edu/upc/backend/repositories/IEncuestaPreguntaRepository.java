package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.backend.entities.EncuestaPregunta;

public interface IEncuestaPreguntaRepository extends JpaRepository<EncuestaPregunta, Long> {
}
