package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Zona;

import java.util.List;


public interface IZonaService {
    public List<Zona> list();
    public void insert(Zona z);
    public void update(Zona z);
    public void delete(int id);
    public List<String[]> cantidadIncidentes();
    public List<String[]> countRutasByZona();
    public List<String[]> SeguridadPorZona(String zona);
    public Zona listId(int id);
}
