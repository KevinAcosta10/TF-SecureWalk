package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Comentario;
import pe.edu.upc.backend.repositories.IComentarioRepository;
import pe.edu.upc.backend.serviceinterfaces.IComentarioService;

import java.util.List;

@Service
public class ComentarioImplement implements IComentarioService {
    @Autowired
    private IComentarioRepository cR;

    @Override
    public List<Comentario> list() {
        return cR.findAll();
    }

    @Override
    public void insert(Comentario c) {
        cR.save(c);
    }

    @Override
    public void update(Comentario c) {
        cR.save(c);
    }

    @Override
    public void delete(int id) {
        cR.deleteById(id);
    }

    @Override
    public List<String[]> TotalComentariosPorUsuario() {
        return cR.TotalComentariosPorUsuario();
    }

    @Override
    public Comentario listId(int id) {
        return cR.findById(id).orElse(new Comentario());
    }

    @Override
    public List<String[]> nombreZonaxComentario() {
        return cR.nombreZonaxComentario();
    }

    @Override
    public List<String[]> comentarioxTipoPregunta() {
        return cR.comentarioxTipoPregunta();
    }


}
