package pe.edu.upc.backend.entities;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name= "Pregunta")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPregunta;

    @Column(name = "textoPregunta", nullable = false, length = 100)
    private String textoPregunta;

    @Column(name = "tipoPregunta", nullable = false, length = 100)
    private String tipoPregunta;

    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL)
    List<EncuestaPregunta> preguntas;

    public Pregunta() {
    }

    public Pregunta(int idPregunta, String textoPregunta, String tipoPregunta, List<EncuestaPregunta> preguntas) {
        this.idPregunta = idPregunta;
        this.textoPregunta = textoPregunta;
        this.tipoPregunta = tipoPregunta;
        this.preguntas = preguntas;
    }

    public int getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(int idPregunta) {
        this.idPregunta = idPregunta;
    }

    public String getTextoPregunta() {
        return textoPregunta;
    }

    public void setTextoPregunta(String textoPregunta) {
        this.textoPregunta = textoPregunta;
    }

    public String getTipoPregunta() {
        return tipoPregunta;
    }

    public void setTipoPregunta(String tipoPregunta) {
        this.tipoPregunta = tipoPregunta;
    }

    public List<EncuestaPregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<EncuestaPregunta> preguntas) {
        this.preguntas = preguntas;
    }
}

