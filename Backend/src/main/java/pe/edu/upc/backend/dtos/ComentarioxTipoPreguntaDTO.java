package pe.edu.upc.backend.dtos;

public class ComentarioxTipoPreguntaDTO {
    private String tipo_pregunta;
    private int cantComentario;

    public String getTipo_pregunta() {
        return tipo_pregunta;
    }

    public void setTipo_pregunta(String tipo_pregunta) {
        this.tipo_pregunta = tipo_pregunta;
    }

    public int getCantComentario() {
        return cantComentario;
    }

    public void setCantComentario(int cantComentario) {
        this.cantComentario = cantComentario;
    }
}
