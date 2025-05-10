package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Ruta;

import java.util.List;

public interface IRutaService {
    public List<Ruta> list();
    public void insert(Ruta r);
    public void update(Ruta r);
    public void delete(int id);

    List<String[]> countRutasByUsuario();

}