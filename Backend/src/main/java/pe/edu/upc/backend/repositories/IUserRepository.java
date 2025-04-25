package pe.edu.upc.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.backend.entities.Users;
@Repository
public interface IUserRepository extends JpaRepository<Users, Integer> {
public Users findOneByUsername(String username);
}
