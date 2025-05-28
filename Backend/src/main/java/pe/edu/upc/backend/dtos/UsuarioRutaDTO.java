package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.entities.Usuario;

import java.time.LocalTime;

public class UsuarioRutaDTO {
        private int idRuta;
        private LocalTime horaInicio;
        private LocalTime horaFin;
        private int nivelSeguridad;
        private String nombreZona;

        public int getIdRuta() {
                return idRuta;
        }

        public void setIdRuta(int idRuta) {
                this.idRuta = idRuta;
        }

        public LocalTime getHoraInicio() {
                return horaInicio;
        }

        public void setHoraInicio(LocalTime horaInicio) {
                this.horaInicio = horaInicio;
        }

        public LocalTime getHoraFin() {
                return horaFin;
        }

        public void setHoraFin(LocalTime horaFin) {
                this.horaFin = horaFin;
        }

        public int getNivelSeguridad() {
                return nivelSeguridad;
        }

        public void setNivelSeguridad(int nivelSeguridad) {
                this.nivelSeguridad = nivelSeguridad;
        }

        public String getNombreZona() {
                return nombreZona;
        }

        public void setNombreZona(String nombreZona) {
                this.nombreZona = nombreZona;
        }
}
