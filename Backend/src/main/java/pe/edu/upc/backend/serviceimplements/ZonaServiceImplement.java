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
    public void insert(Zona z) {
        zR.save(z);
    }

    @Override
    public void update(Zona z) {
        zR.save(z);
    }

    @Override
    public void delete(int id) {
        zR.deleteById(id);
    }

    @Override
    public List<String[]> cantidadIncidentes() {
        return zR.cantidadIncidentes();
    }

    @Override
    public List<String[]> countRutasByZona() {
        return zR.countRutasByZona();
    }

    @Override
    public List<String[]> SeguridadPorZona(String zona) {
        return zR.SeguridadPorZona(zona);
    }

    @Override
    public Zona listId(int id) {
        return zR.findById(id).orElse(new Zona());
    }

    @Override
    public List<String[]> nombreZonaxAprobacion() {
        return zR.nombreZonaxAprobacion();
    }
}
