package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.dtos.RutaDTO;

import java.util.List;
import java.util.Optional;

public interface IRutaService {
    List<RutaDTO> listarRutas();
    Optional<RutaDTO> obtenerRutaPorId(int id);
    RutaDTO actualizarRuta(int id, RutaDTO rutaDTO);
    boolean eliminarRuta(int id);
}