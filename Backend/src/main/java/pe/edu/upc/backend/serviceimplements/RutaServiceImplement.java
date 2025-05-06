package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.dtos.RutaDTO;
import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.repositories.IRutaRepository;
import pe.edu.upc.backend.serviceinterfaces.IRutaService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RutaServiceImplement implements IRutaService {
    @Autowired
    private IRutaRepository rR;

    @Override
    public List<Ruta> list() {
        return rR.findAll();
    }

    @Override
    public List<String[]> countRutasByUsuario() {
        return rR.countRutasByUsuario();
    }

}
