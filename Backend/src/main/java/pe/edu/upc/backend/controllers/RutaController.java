package pe.edu.upc.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.backend.dtos.RutaDTO;
/* import pe.edu.upc.backend.dtos.CrearRutaDTO;*/

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/rutas")
public class RutaController {

    // Simulamos una "base de datos en memoria"
    private final List<RutaDTO> rutas = new ArrayList<>();

    // Obtener todas las rutas
    @GetMapping
    public List<RutaDTO> listarRutas() {
        return rutas;
    }

    // Obtener una ruta por su ID
    @GetMapping("/{id}")
    public ResponseEntity<RutaDTO> obtenerRuta(@PathVariable int id) {
        return rutas.stream()
                .filter(r -> r.getIdRuta() == id)
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
/*
    // Crear una nueva ruta
    @PostMapping
    public ResponseEntity<RutaDTO> crearRuta(@RequestBody CrearRutaDTO crearRutaDTO) {
        RutaDTO nuevaRuta = new RutaDTO(
                currentId++,
                crearRutaDTO.getIdZona(),
                crearRutaDTO.getIdUsuario(),
                crearRutaDTO.getFechaHoraInicio(),
                crearRutaDTO.getFechaHoraFin()
        );
        rutas.add(nuevaRuta);
        return ResponseEntity.ok(nuevaRuta);
    }
*/
    // Actualizar una ruta existente
    @PutMapping("/{id}")
    public ResponseEntity<RutaDTO> actualizarRuta(@PathVariable int id, @RequestBody RutaDTO rutaActualizada) {
        for (int i = 0; i < rutas.size(); i++) {
            if (rutas.get(i).getIdRuta() == id) {
                rutas.set(i, rutaActualizada);
                return ResponseEntity.ok(rutaActualizada);
            }
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar una ruta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRuta(@PathVariable int id) {
        boolean removed = rutas.removeIf(r -> r.getIdRuta() == id);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}