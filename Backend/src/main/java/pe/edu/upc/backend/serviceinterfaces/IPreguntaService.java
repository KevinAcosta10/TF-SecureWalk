package pe.edu.upc.backend.serviceinterfaces;
import pe.edu.upc.backend.entities.Pregunta;
import java.util.List;

public interface IPreguntaService {
    public List<Pregunta> list();
    public void insert(Pregunta p);
    public void update(Pregunta p);
    public void delete(int id);
    List<String[]> obtenerPreguntasConEncuesta();
}
