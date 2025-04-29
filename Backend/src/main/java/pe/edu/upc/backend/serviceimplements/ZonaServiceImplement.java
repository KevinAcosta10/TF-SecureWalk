package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Zona;
import pe.edu.upc.backend.repositories.IZonaRepository;
import pe.edu.upc.backend.serviceinterfaces.IZonaService;

import java.util.List;

@Service
public class ZonaServiceImplement implements IZonaService {
    @Autowired
    private IZonaRepository zR;

    @Override
    public List<Zona> list() {
        return zR.findAll();
    }

    @Override
    public List<String[]> countRutasByZona() {
        return zR.countRutasByZona();
    }
}
