package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="EncuestaPregunta")
public class EncuestaPregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEncuestaPregunta;

    @ManyToOne
    @JoinColumn(name="idEncuesta")
    private Encuesta idEncuesta;

    @ManyToOne
    @JoinColumn(name="idPregunta")
    private Pregunta idPregunta;

    @OneToMany(mappedBy = "encuestaPregunta", cascade = CascadeType.ALL)
    private List<Respuesta> respuestas;

    public EncuestaPregunta() {
    }

    public EncuestaPregunta(long idEncuestaPregunta, Encuesta idEncuesta, Pregunta idPregunta) {
        this.idEncuestaPregunta = idEncuestaPregunta;
        this.idEncuesta = idEncuesta;
        this.idPregunta = idPregunta;
    }

    public long getIdEncuestaPregunta() {
        return idEncuestaPregunta;
    }

    public void setIdEncuestaPregunta(long idEncuestaPregunta) {
        this.idEncuestaPregunta = idEncuestaPregunta;
    }

    public Encuesta getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(Encuesta idEncuesta) {
        this.idEncuesta = idEncuesta;
    }

    public Pregunta getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(Pregunta idPregunta) {
        this.idPregunta = idPregunta;
    }
}
