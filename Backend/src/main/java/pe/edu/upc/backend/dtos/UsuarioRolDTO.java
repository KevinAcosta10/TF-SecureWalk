package pe.edu.upc.backend.dtos;

<<<<<<< HEAD
import java.time.LocalDateTime;

public class UsuarioRolDTO {
    private int idUsuario;
    private String nombreUsuario;
    private String emailUsuario;
    private String telefonoUsuario;
    private String direccionUsuario;

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }
=======
public class UsuarioRolDTO {
    private String nombreUsuario;
    private String nombreRol;
>>>>>>> origin/JheanPieer

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

<<<<<<< HEAD
    public String getEmailUsuario() {
        return emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public String getTelefonoUsuario() {
        return telefonoUsuario;
    }

    public void setTelefonoUsuario(String telefonoUsuario) {
        this.telefonoUsuario = telefonoUsuario;
    }

    public String getDireccionUsuario() {
        return direccionUsuario;
    }

    public void setDireccionUsuario(String direccionUsuario) {
        this.direccionUsuario = direccionUsuario;
=======
    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
>>>>>>> origin/JheanPieer
    }
}
