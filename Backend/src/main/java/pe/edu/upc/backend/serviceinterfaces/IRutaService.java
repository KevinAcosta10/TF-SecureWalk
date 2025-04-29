package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.dtos.RutaDTO;
import pe.edu.upc.backend.entities.Ruta;

import java.util.List;
import java.util.Optional;

public interface IRutaService {
    public List<Ruta> list();

    List<String[]> countRutasByUsuario();

}