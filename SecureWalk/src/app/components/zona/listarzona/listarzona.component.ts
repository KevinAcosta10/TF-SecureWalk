import { Component, OnInit, ViewChild } from '@angular/core';
import { Zona } from '../../../models/zona';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZonaService } from '../../../services/zona.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
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
    CommonModule
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


  constructor(private zS: ZonaService) { }
  ngOnInit(): void {
    this.zS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.zS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
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
      this.markerPositions = this.dataSource.data.map(coord => ({
        lat: coord.latitudZona,
        lng: coord.longitudZona
      }));
      console.log('Coordenadas cargadas:', this.markerPositions);

      if (this.markerPositions.length > 0) {
        this.center = this.markerPositions[0];
      }
    } else {
      this.markerPositions = [];
    }
  }
}
