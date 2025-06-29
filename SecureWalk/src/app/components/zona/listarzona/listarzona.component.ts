import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Zona } from '../../../models/zona';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZonaService } from '../../../services/zona.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarzona',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    GoogleMap,
    MapAdvancedMarker,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listarzona.component.html',
  styleUrl: './listarzona.component.css'
})
export class ListarzonaComponent implements OnInit {
  coordenadas: Zona[] = [];
  center: google.maps.LatLngLiteral = { lat: -12.0873795, lng: -77.0500079 };
  zoom = 13;
  markerPositions: google.maps.LatLngLiteral[] = [];

  dataSource: MatTableDataSource<Zona> = new MatTableDataSource();
  displayedColumns: string[] = ['c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //propiedades para el buscador
  searchLat: number | null = null;
  searchLng: number | null = null;
  temporaryMarkerPosition: google.maps.LatLngLiteral | null = null; // Marcador de la búsqueda


  constructor(private zS: ZonaService, private ngZone: NgZone) { }
  ngOnInit(): void {
    this.zS.list().subscribe(data => {
      console.log('Datos iniciales de zonas:', data);
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.cargarCoordenadas();//llamada a los marcadores
    })
    this.zS.getList().subscribe(data => {
      console.log('Datos actualizados de zonas:', data);
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      this.cargarCoordenadas();//actualiza los marcadores
    })
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  eliminar(id: number) {
    this.zS.deleteS(id).subscribe(data => {
      this.zS.list().subscribe(data => {
        this.zS.setList(data)
      })
    })
  }
  cargarCoordenadas() {
    if (this.dataSource.data && this.dataSource.data.length > 0) {
      this.ngZone.run(() => {
        this.markerPositions = this.dataSource.data.map(coord => ({
          lat: coord.latitudZona,
          lng: coord.longitudZona
        }));
        console.log('Marcadores generados:', this.markerPositions);

        if (this.markerPositions.length > 0 && !this.temporaryMarkerPosition) {
          this.center = this.markerPositions[0];
        }
      });
    } else {
      this.markerPositions = [];
      console.log('No hay datos en dataSource para cargar coordenadas.');
    }
  }
  //para el buscador

  searchLocation(): void {
    if (this.searchLat !== null && this.searchLng !== null) {
      const lat = parseFloat(this.searchLat.toString());
      const lng = parseFloat(this.searchLng.toString());

      // Validacion de las coordenadas, si son números válidos
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        this.temporaryMarkerPosition = { lat: lat, lng: lng };
        this.center = { lat: lat, lng: lng };
        this.zoom = 18; // Acercar el mapa a la ubicación buscada

        console.log('Buscando ubicación:', this.temporaryMarkerPosition);
      } else {
        alert('Por favor, ingresa coordenadas válidas (Latitud entre -90 y 90, Longitud entre -180 y 180).');
        this.clearSearch(); // Limpiar el marcador si las coordenadas no son válidas
      }
    } else {
      alert('Por favor, ingresa valores para Latitud y Longitud.');
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchLat = null;
    this.searchLng = null;
    this.temporaryMarkerPosition = null; // Elimina el marcador temporal

    // Opcional: Volver a centrar el mapa en las coordenadas de la DB si las hay
    if (this.markerPositions.length > 0) {
      this.center = this.markerPositions[0];
      this.zoom = 13; // Volver al zoom global
    } else {
      // O a unas coordenadas por defecto si no hay marcadores en la DB
      this.center = { lat: -12.0873795, lng: -77.0500079 };
      this.zoom = 13;
    }
    console.log('Búsqueda limpiada.');
  }
}
