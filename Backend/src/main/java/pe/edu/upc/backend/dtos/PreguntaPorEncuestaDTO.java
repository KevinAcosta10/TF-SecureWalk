package pe.edu.upc.backend.dtos;

public class PreguntaPorEncuestaDTO {

    private String textoPregunta;
    private String tipoPregunta;
    private String nombreEncuesta;

    public String getTextoPregunta() { return textoPregunta; }
    public void setTextoPregunta(String textoPregunta) { this.textoPregunta = textoPregunta; }

    public String getTipoPregunta() { return tipoPregunta; }
    public void setTipoPregunta(String tipoPregunta) { this.tipoPregunta = tipoPregunta; }

    public String getNombreEncuesta() { return nombreEncuesta; }
    public void setNombreEncuesta(String nombreEncuesta) { this.nombreEncuesta = nombreEncuesta; }


}
