package pe.edu.upc.backend.dtos;

public class NombreZonaxComentarioDTO {
    private String nombre_zona;
    private int cantComentario;

    public String getNombre_zona() {
        return nombre_zona;
    }

    public void setNombre_zona(String nombre_zona) {
        this.nombre_zona = nombre_zona;
    }

    public int getCantComentario() {
        return cantComentario;
    }

    public void setCantComentario(int cantComentario) {
        this.cantComentario = cantComentario;
    }
}
