package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "EncuestaPregunta")
public class EncuestaPregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEncuestaPregunta;

    @ManyToOne
    @JoinColumn(name = "idEncuesta")
    private Encuesta encuesta;
    @ManyToOne
    @JoinColumn(name = "idPregunta")
    private Pregunta pregunta;


    @OneToMany(mappedBy = "encuestaPregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Respuesta> respuestas;

    public EncuestaPregunta() {
    }

    public EncuestaPregunta(int idEncuestaPregunta, Encuesta encuesta, Pregunta pregunta, List<Respuesta> respuestas) {
        this.idEncuestaPregunta = idEncuestaPregunta;
        this.encuesta = encuesta;
        this.pregunta = pregunta;
        this.respuestas = respuestas;
    }

    public int getIdEncuestaPregunta() {
        return idEncuestaPregunta;
    }

    public void setIdEncuestaPregunta(int idEncuestaPregunta) {
        this.idEncuestaPregunta = idEncuestaPregunta;
    }

    public Encuesta getEncuesta() {
        return encuesta;
    }

    public void setEncuesta(Encuesta encuesta) {
        this.encuesta = encuesta;
    }

    public Pregunta getPregunta() {
        return pregunta;
    }

    public void setPregunta(Pregunta pregunta) {
        this.pregunta = pregunta;
    }

    public List<Respuesta> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<Respuesta> respuestas) {
        this.respuestas = respuestas;
    }
}
