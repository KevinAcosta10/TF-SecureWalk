package pe.edu.upc.backend.serviceinterfaces;
import pe.edu.upc.backend.entities.Pregunta;
import java.util.List;

public interface IPreguntaService {
    public List<Pregunta> list();
    public void insert(Pregunta preg);
    public void update(Pregunta preg);
    public void delete(int id);
}
