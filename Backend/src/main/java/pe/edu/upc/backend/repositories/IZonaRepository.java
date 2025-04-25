package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Zona;
@Repository
public interface IZonaRepository extends JpaRepository<Zona, Integer> {
}
