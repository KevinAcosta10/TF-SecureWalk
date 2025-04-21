package pe.edu.upc.backend.entities;
import jakarta.persistence.*;
@Entity
@Table(name= "Pregunta")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPregunta;

    @Column(name = "pregunta", nullable = false, length = 100)
    private String pregunta;

    public Pregunta(int idPregunta,String pregunta) {
    this.idPregunta = idPregunta;
    this.pregunta = pregunta;
    }
    public Pregunta() {
    }
    public int getIdPregunta() {
        return idPregunta;
    }
    public void setIdPregunta(int idPregunta) {
        this.idPregunta = idPregunta;
    }
    public String getPregunta() {
        return pregunta;
    }
    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }
}

