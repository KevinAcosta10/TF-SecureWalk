package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upc.backend.entities.EvaluacionIncidente;

public interface IEvaluacionIncidenteRepository extends JpaRepository<EvaluacionIncidente, Integer> {
}
