package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Pregunta")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPregunta;

    @Column(name = "textoPregunta")
    private String textoPregunta;
    @Column(name = "tipoPregunta")
    private String tipoPregunta;
    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EncuestaPregunta> encuestasPreguntas;

    public Pregunta() {
    }

    public Pregunta(int idPregunta, String textoPregunta, String tipoPregunta, List<EncuestaPregunta> encuestasPreguntas) {
        this.idPregunta = idPregunta;
        this.textoPregunta = textoPregunta;
        this.tipoPregunta = tipoPregunta;
        this.encuestasPreguntas = encuestasPreguntas;
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

    public List<EncuestaPregunta> getEncuestasPreguntas() {
        return encuestasPreguntas;
    }

    public void setEncuestasPreguntas(List<EncuestaPregunta> encuestasPreguntas) {
        this.encuestasPreguntas = encuestasPreguntas;
    }
}

