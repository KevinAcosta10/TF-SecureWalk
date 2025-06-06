package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Encuesta;

import java.util.List;

public interface IEncuestaService {
    public List<Encuesta> list();
    public void insert(Encuesta e);
    public void update(Encuesta e);
    public void eliminar(int id);
    public Encuesta listId(int id);
}