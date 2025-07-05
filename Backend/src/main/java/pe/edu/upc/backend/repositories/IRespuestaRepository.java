package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Respuesta;

import java.util.List;

@Repository
public interface IRespuestaRepository extends JpaRepository<Respuesta, Integer> {

}
