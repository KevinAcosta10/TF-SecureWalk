package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Zona;

import java.util.List;

public interface IZonaService {
    public List<Zona> list();

    List<String[]> countRutasByZona();
}
