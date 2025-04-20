package pe.edu.upc.backend.entities;

public class Rol {
    private int idRol;
    private String nombreRol;
    private Usuario user;

    public Rol() {
    }

    public Rol(int idRol, String nombreRol, Usuario user) {
        this.idRol = idRol;
        this.nombreRol = nombreRol;
        this.user = user;
    }

    public int getIdRol() {
        return idRol;
    }

    public void setIdRol(int idRol) {
        this.idRol = idRol;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }
}
