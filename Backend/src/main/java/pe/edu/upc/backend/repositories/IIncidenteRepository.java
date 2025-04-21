package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Incidente;

@Repository
public interface IIncidenteRepository extends JpaRepository<Incidente, Integer> {
}
