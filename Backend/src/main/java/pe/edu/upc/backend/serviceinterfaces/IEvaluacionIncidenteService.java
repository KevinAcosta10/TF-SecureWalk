package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.EvaluacionIncidente;

import java.util.List;

public interface IEvaluacionIncidenteService {
    public List<EvaluacionIncidente> list();
    public void insert(EvaluacionIncidente eI);
    public EvaluacionIncidente listId(int id);
    public void update(EvaluacionIncidente eI);
    public void delete(int id);
}
