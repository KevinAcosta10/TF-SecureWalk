package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.EncuestaPregunta;

import java.util.List;

public interface IEncuestaPreguntaService {
    public List<EncuestaPregunta> list();
    public void insert(EncuestaPregunta ep);
    public void update(EncuestaPregunta ep);
    public void eliminar(int id);
    public EncuestaPregunta listId(int id);

}
