package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.EvaluacionIncidente;
import pe.edu.upc.backend.repositories.IEvaluacionIncidenteRepository;
import pe.edu.upc.backend.serviceinterfaces.IEvaluacionIncidenteService;

import java.util.List;

@Service
public class EvaluacionIndicenteImplement implements IEvaluacionIncidenteService {
    @Autowired
    private IEvaluacionIncidenteRepository eIR;
    @Override
    public List<EvaluacionIncidente> list() {
        return eIR.findAll();
    }
    @Override
    public void insert(EvaluacionIncidente eI) {
        eIR.save(eI);
    }
    @Override
    public EvaluacionIncidente listId(int id) {
        return eIR.findById(id).orElse(new EvaluacionIncidente());
    }
    @Override
    public void update(EvaluacionIncidente eI) {
        eIR.save(eI);
    }
    @Override
    public void delete(int id) {
        eIR.deleteById(id);
    }
    }

