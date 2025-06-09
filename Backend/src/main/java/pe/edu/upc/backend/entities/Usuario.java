package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Usuario")
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuario;

    @Column(name = "nombreUsuario", nullable = false)
    private String nombreUsuario;
    @Column(name = "emailUsuario", nullable = false)
    private String emailUsuario;
    @Column(name = "telefonoUsuario", nullable = false)
    private int telefonoUsuario;
    @Column(name = "direccionUsuario", nullable = false)
    private String direccionUsuario;
    @Column(name = "fechaRegistroUsuario", nullable = false)
    private LocalDate fechaRegistroUsuario;

    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "enable", nullable = false)
    private boolean enable;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Rol> roles;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EvaluacionIncidente> evaluacionesIncidente;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Incidente> incidentes;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UsuarioRuta> usuariosRutas;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Respuesta> respuestas;

    public Usuario() {
    }

    public Usuario(int idUsuario, String nombreUsuario, String emailUsuario, int telefonoUsuario, String direccionUsuario, LocalDate fechaRegistroUsuario, String username, String password, boolean enable, List<Rol> roles, List<Post> posts, List<EvaluacionIncidente> evaluacionesIncidente, List<Incidente> incidentes, List<UsuarioRuta> usuariosRutas, List<Comentario> comentarios, List<Respuesta> respuestas) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.emailUsuario = emailUsuario;
        this.telefonoUsuario = telefonoUsuario;
        this.direccionUsuario = direccionUsuario;
        this.fechaRegistroUsuario = fechaRegistroUsuario;
        this.username = username;
        this.password = password;
        this.enable = enable;
        this.roles = roles;
        this.posts = posts;
        this.evaluacionesIncidente = evaluacionesIncidente;
        this.incidentes = incidentes;
        this.usuariosRutas = usuariosRutas;
        this.comentarios = comentarios;
        this.respuestas = respuestas;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public int getTelefonoUsuario() {
        return telefonoUsuario;
    }

    public void setTelefonoUsuario(int telefonoUsuario) {
        this.telefonoUsuario = telefonoUsuario;
    }

    public String getDireccionUsuario() {
        return direccionUsuario;
    }

    public void setDireccionUsuario(String direccionUsuario) {
        this.direccionUsuario = direccionUsuario;
    }

    public LocalDate getFechaRegistroUsuario() {
        return fechaRegistroUsuario;
    }

    public void setFechaRegistroUsuario(LocalDate fechaRegistroUsuario) {
        this.fechaRegistroUsuario = fechaRegistroUsuario;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public List<Rol> getRoles() {
        return roles;
    }

    public void setRoles(List<Rol> roles) {
        this.roles = roles;
    }

    public boolean isEnable() {
        return enable;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<EvaluacionIncidente> getEvaluacionesIncidente() {
        return evaluacionesIncidente;
    }

    public void setEvaluacionesIncidente(List<EvaluacionIncidente> evaluacionesIncidente) {
        this.evaluacionesIncidente = evaluacionesIncidente;
    }

    public List<Incidente> getIncidentes() {
        return incidentes;
    }

    public void setIncidentes(List<Incidente> incidentes) {
        this.incidentes = incidentes;
    }

    public List<UsuarioRuta> getUsuariosRutas() {
        return usuariosRutas;
    }

    public void setUsuariosRutas(List<UsuarioRuta> usuariosRutas) {
        this.usuariosRutas = usuariosRutas;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public List<Respuesta> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<Respuesta> respuestas) {
        this.respuestas = respuestas;
    }
}
