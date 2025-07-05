package pe.edu.upc.backend.dtos;

public class TipoPreguntaxPreguntaDTO {
    private String tipoPregunta;
    private int cantPregunta;

    public String getTipoPregunta() {
        return tipoPregunta;
    }

    public void setTipoPregunta(String tipoPregunta) {
        this.tipoPregunta = tipoPregunta;
    }

    public int getCantPregunta() {
        return cantPregunta;
    }

    public void setCantPregunta(int cantPregunta) {
        this.cantPregunta = cantPregunta;
    }
}
