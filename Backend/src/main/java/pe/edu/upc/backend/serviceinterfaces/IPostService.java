package pe.edu.upc.backend.serviceinterfaces;
import pe.edu.upc.backend.entities.Post;
import java.util.List;

public interface IPostService {
    public List<Post> list();
    public void insert(Post p);
    public void update(Post p);
    public void delete(int id);
    public List<String[]> postPorIncidente();
    public Post listId(int id);
}
