package pe.edu.upc.backend.serviceimplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Post;
import pe.edu.upc.backend.repositories.IPostRepository;
import pe.edu.upc.backend.serviceinterfaces.IPostService;

import java.util.List;
@Service
public class PostImplement implements IPostService {
    @Autowired
    private IPostRepository pT;

    @Override
    public List<Post> list(){
        return pT.findAll();
    }

    @Override
    public void insert(Post p) {
        pT.save(p);
    }

    @Override
    public void update(Post p) {
        pT.save(p);
    }

    @Override
    public void delete(int id) {
        pT.deleteById(id);
    }

    @Override
    public List<String[]> postPorIncidente() {
        return pT.postPorIncidente();
    }
    public Post listId(int id) {
        return pT.findById(id).orElse(new Post());
    }
}
