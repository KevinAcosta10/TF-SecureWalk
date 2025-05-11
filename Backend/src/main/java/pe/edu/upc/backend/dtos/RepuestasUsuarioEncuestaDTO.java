package pe.edu.upc.backend.dtos;

public class RepuestasUsuarioEncuestaDTO {
    private int idRepuesta;
    private String textoPregunta;
    private String textoRespuesta;
    private String nombreEncuesta;

    public int getIdRepuesta() {
        return idRepuesta;
    }

    public void setIdRepuesta(int idRepuesta) {
        this.idRepuesta = idRepuesta;
    }

    public String getTextoRespuesta() {
        return textoRespuesta;
    }

    public void setTextoRespuesta(String textoRespuesta) {
        this.textoRespuesta = textoRespuesta;
    }

    public String getTextoPregunta() {
        return textoPregunta;
    }

    public void setTextoPregunta(String textoPregunta) {
        this.textoPregunta = textoPregunta;
    }

    public String getNombreEncuesta() {
        return nombreEncuesta;
    }

    public void setNombreEncuesta(String nombreEncuesta) {
        this.nombreEncuesta = nombreEncuesta;
    }
}
