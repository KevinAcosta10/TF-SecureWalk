package pe.edu.upc.backend.serviceinterfaces;
import pe.edu.upc.backend.entities.Post;
import java.util.List;

public interface IPostService {
    public List<Post> list();
    public void insert(Post pos);
    public void update(Post pos);
    public void delete(int id);
}
