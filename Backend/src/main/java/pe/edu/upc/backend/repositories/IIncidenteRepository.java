package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.dtos.IncidentesPorUsuarioDTO;
import pe.edu.upc.backend.entities.Incidente;

import java.util.List;

@Repository
public interface IIncidenteRepository extends JpaRepository<Incidente, Integer> {

    @Query(value = "SELECT i.id_incidente, i.descripcion_incidente, i.fecha_incidente, i.tipo_incidente, \n" +
            "       u.id_usuario, u.nombre_usuario\n" +
            " FROM incidente i\n" +
            " JOIN usuario u ON i.id_usuario = u.id_usuario\n" +
            " ORDER BY i.fecha_incidente DESC", nativeQuery = true)
    public List<String[]> IncidentesPorUsuario();
}
