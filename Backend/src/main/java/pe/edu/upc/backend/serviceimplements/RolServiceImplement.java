package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Role;
import pe.edu.upc.backend.repositories.IRolRepository;
import pe.edu.upc.backend.serviceinterfaces.IRolService;

import java.util.List;
@Service
public class RolServiceImplement implements IRolService {
    @Autowired
    private IRolRepository rR;

    @Override
    public List<Role> list() {
        return rR.findAll();
    }
}
