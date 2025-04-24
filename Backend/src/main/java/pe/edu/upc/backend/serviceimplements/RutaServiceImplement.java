package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.dtos.RutaDTO;
import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.repositories.IRutaRepository;
import pe.edu.upc.backend.serviceinterfaces.IRutaService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RutaServiceImplement implements IRutaService {
    @Autowired
    private IRutaRepository rR;

    @Override
    public List<RutaDTO> listarRutas() {
        return rR.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RutaDTO> obtenerRutaPorId(int id) {
        return rR.findById(id).map(this::convertirADTO);
    }

    @Override
    public RutaDTO actualizarRuta(int id, RutaDTO rutaDTO) {
        Ruta ruta = rR.findById(id).orElseThrow(() -> new RuntimeException("Ruta no encontrada"));
        ruta.setIdZona(rutaDTO.getIdZona());
        ruta.setIdUsuario(rutaDTO.getIdUsuario());
        ruta.setFechaHoraInicio(rutaDTO.getFechaHoraInicio());
        ruta.setFechaHoraFin(rutaDTO.getFechaHoraFin());

        return convertirADTO(rR.save(ruta));
    }

    @Override
    public boolean eliminarRuta(int id) {
        if (rR.existsById(id)) {
            rR.deleteById(id);
            return true;
        }
        return false;
    }

    // Método auxiliar para convertir entidad a DTO
    private RutaDTO convertirADTO(Ruta ruta) {
        return new RutaDTO(
                ruta.getIdRuta(),
                ruta.getIdZona(),
                ruta.getIdUsuario(),
                ruta.getFechaHoraInicio(),
                ruta.getFechaHoraFin()
        );
    }
}
