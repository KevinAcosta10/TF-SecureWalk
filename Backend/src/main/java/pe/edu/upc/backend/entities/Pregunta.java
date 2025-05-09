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

    @OneToMany(mappedBy = "idPregunta", cascade = CascadeType.ALL)
    private List<EncuestaPregunta> encuestaPreguntas;

    public Pregunta() {
    }

    public Pregunta(int idPregunta, String textoPregunta, String tipoPregunta, List<EncuestaPregunta> encuestaPreguntas) {
        this.idPregunta = idPregunta;
        this.textoPregunta = textoPregunta;
        this.tipoPregunta = tipoPregunta;
        this.encuestaPreguntas = encuestaPreguntas;
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

    public List<EncuestaPregunta> getEncuestaPreguntas() {
        return encuestaPreguntas;
    }

    public void setEncuestaPreguntas(List<EncuestaPregunta> encuestaPreguntas) {
        this.encuestaPreguntas = encuestaPreguntas;
    }
}

