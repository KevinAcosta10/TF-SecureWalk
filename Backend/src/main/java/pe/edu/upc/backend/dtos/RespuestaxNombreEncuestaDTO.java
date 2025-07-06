package pe.edu.upc.backend.dtos;

public class RespuestaxNombreEncuestaDTO {
    private String nombre_encuesta;
    private int cantRespuesta;

    public String getNombre_encuesta() {
        return nombre_encuesta;
    }

    public void setNombre_encuesta(String nombre_encuesta) {
        this.nombre_encuesta = nombre_encuesta;
    }

    public int getCantRespuesta() {
        return cantRespuesta;
    }

    public void setCantRespuesta(int cantRespuesta) {
        this.cantRespuesta = cantRespuesta;
    }
}
