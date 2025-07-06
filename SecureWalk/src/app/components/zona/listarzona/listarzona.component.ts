import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Zona } from '../../../models/zona';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZonaService } from '../../../services/zona.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
interface MarkerData {
  position: google.maps.LatLngLiteral
  zona: Zona
  index: number // Índice en la lista original para navegación
}
@Component({
    selector: 'app-listarzona',
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
        MatInputModule,
    ],
    templateUrl: './listarzona.component.html',
    styleUrl: './listarzona.component.css'
})
export class ListarzonaComponent implements OnInit {
  // Datos principales
  coordenadas: Zona[] = []
  dataSource: MatTableDataSource<Zona> = new MatTableDataSource()
  displayedColumns: string[] = ["c4", "c5", "c6"]
  
  // Configuración del mapa
  center: google.maps.LatLngLiteral = { lat: -12.0698355, lng: -77.0428575 }
  zoom = 13

  // Marcadores mejorados
  markerData: MarkerData[] = []
  temporaryMarkerPosition: google.maps.LatLngLiteral | null = null

  // Estado de selección
  selectedZonaId: number | null = null
  selectedMarkerIndex = -1

  // Búsqueda mejorada
  searchLat: number | null = null
  searchLng: number | null = null
  searchRadius = 0.001 // ~100 metros
  isSearchActive = false
  searchResults: Zona[] = []

  // Referencias del DOM
  @ViewChild(GoogleMap) googleMap!: GoogleMap
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    private zS: ZonaService,
    private ngZone: NgZone,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) { }  
  ngOnInit(): void {
    this.loadInitialData()
    this.subscribeToUpdates()
  }

  ngAfterViewInit(): void {
    this.setupPaginator()
  }

  private loadInitialData(): void {
    this.zS.list().subscribe({
      next: (data) => {
        console.log("Datos iniciales cargados:", data)
        this.updateDataAndMarkers(data)
      },
    })
  }

  private subscribeToUpdates(): void {
    this.zS.getList().subscribe({
      next: (data) => {
        console.log("Datos actualizados recibidos:", data)
        this.updateDataAndMarkers(data)
      },
    })
  }

  private updateDataAndMarkers(data: Zona[]): void {
    this.coordenadas = data
    this.dataSource.data = data
    this.generateMarkers()
    this.adjustMapView()
    this.cdr.detectChanges()
  }

  private setupPaginator(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator

      // Escuchar cambios de página para mantener selección visible
      this.paginator.page.subscribe(() => {
        this.ensureSelectedItemVisible()
      })
    }
  }

  private generateMarkers(): void {
    this.markerData = this.coordenadas.map((zona, index) => ({
      position: {
        lat: Number(zona.latitudZona),
        lng: Number(zona.longitudZona),
      },
      zona: zona,
      index: index,
    }))

    console.log("Marcadores generados:", this.markerData.length)
  }

  private adjustMapView(): void {
    if (this.markerData.length === 0) return

    if (this.markerData.length === 1) {
      this.center = this.markerData[0].position
      this.zoom = 15
    } else {
      setTimeout(() => {
        if (this.googleMap?.googleMap) {
          const bounds = new google.maps.LatLngBounds()
          this.markerData.forEach((marker) => bounds.extend(marker.position))
          this.googleMap.googleMap.fitBounds(bounds, {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          })
        }
      }, 100)
    }
  }

  onMarkerClick(clickedPosition: google.maps.LatLngLiteral): void {
    console.log("Clic en marcador:", clickedPosition)

    // Encontrar el marcador clickeado con mayor precisión
    const markerInfo = this.markerData.find((marker) => this.areCoordinatesEqual(marker.position, clickedPosition))

    if (markerInfo) {
      this.selectZonaFromMarker(markerInfo)
    }
  }

  private selectZonaFromMarker(markerInfo: MarkerData): void {
    this.selectedZonaId = markerInfo.zona.idZona
    this.selectedMarkerIndex = markerInfo.index

    // Centrar mapa en el marcador seleccionado
    this.center = markerInfo.position
    this.zoom = 16

    // Navegar a la página correcta del paginador
    this.navigateToSelectedItem(markerInfo.index)

    // Mostrar información
    this.showSuccess(`Zona seleccionada: ${markerInfo.zona.nombreZona}`)

    console.log("Zona seleccionada desde marcador:", markerInfo.zona)
  }

  private navigateToSelectedItem(itemIndex: number): void {
    if (!this.paginator) return

    const pageSize = this.paginator.pageSize
    const targetPage = Math.floor(itemIndex / pageSize)

    if (this.paginator.pageIndex !== targetPage) {
      this.paginator.pageIndex = targetPage
      this.dataSource.paginator = this.paginator // Forzar actualización
    }
    setTimeout(() => {
      this.scrollToSelectedRow()
    }, 100)
  }

  private scrollToSelectedRow(): void {
    const selectedRow = document.querySelector(".selected-row")
    if (selectedRow) {
      selectedRow.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  private ensureSelectedItemVisible(): void {
    if (this.selectedZonaId !== null) {
      // Verificar si el elemento seleccionado está en la página actual
      const currentPageData = this.getCurrentPageData()
      const isVisible = currentPageData.some((zona) => zona.idZona === this.selectedZonaId)

      if (!isVisible) {
        this.clearSelection()
      }
    }
  }

  private getCurrentPageData(): Zona[] {
    if (!this.paginator) return this.dataSource.data

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize
    const endIndex = startIndex + this.paginator.pageSize
    return this.dataSource.data.slice(startIndex, endIndex)
  }

  searchLocation(): void {
    if (!this.validateSearchInputs()) return

    const lat = this.searchLat!
    const lng = this.searchLng!

    // Crear marcador temporal
    this.temporaryMarkerPosition = { lat, lng }
    this.center = { lat, lng }
    this.zoom = 18
    this.isSearchActive = true

    // Buscar zonas cercanas con precisión mejorada
    this.performPrecisionSearch(lat, lng)

    console.log("Búsqueda realizada:", { lat, lng, resultados: this.searchResults.length })
  }

  private validateSearchInputs(): boolean {
    if (this.searchLat === null || this.searchLng === null) {
      this.showError("Por favor, ingresa valores para Latitud y Longitud")
      return false
    }

    const lat = this.searchLat
    const lng = this.searchLng

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      this.showError("Coordenadas inválidas. Latitud: -90 a 90, Longitud: -180 a 180")
      this.clearSearch()
      return false
    }

    return true
  }

  private performPrecisionSearch(searchLat: number, searchLng: number): void {
    // Búsqueda con múltiples niveles de precisión
    const precisionLevels = [0.0001, 0.001, 0.01, 0.1] // ~10m, ~100m, ~1km, ~10km

    for (const radius of precisionLevels) {
      this.searchResults = this.coordenadas.filter((zona) => {
        const distance = this.calculatePreciseDistance(
          searchLat,
          searchLng,
          Number(zona.latitudZona),
          Number(zona.longitudZona),
        )
        return distance <= radius
      })

      if (this.searchResults.length > 0) {
        this.searchRadius = radius
        break
      }
    }

    // Actualizar tabla con resultados
    this.dataSource.data = this.searchResults
    this.generateMarkers() // Regenerar marcadores para los resultados

    // Mostrar información de búsqueda
    if (this.searchResults.length > 0) {
      this.showSuccess(
        `${this.searchResults.length} zona(s) encontrada(s) en un radio de ${this.getRadiusDescription()}`,
      )
    }
  }

  private calculatePreciseDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // Radio de la Tierra en km
    const dLat = this.toRadians(lat2 - lat1)
    const dLng = this.toRadians(lng2 - lng1)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distancia en km
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  private getRadiusDescription(): string {
    if (this.searchRadius <= 0.0001) return "~10 metros"
    if (this.searchRadius <= 0.001) return "~100 metros"
    if (this.searchRadius <= 0.01) return "~1 kilómetro"
    return "~10 kilómetros"
  }

  clearSearch(): void {
    this.searchLat = null
    this.searchLng = null
    this.temporaryMarkerPosition = null
    this.isSearchActive = false
    this.searchResults = []
    this.searchRadius = 0.001

    this.dataSource.data = this.coordenadas
    this.generateMarkers()

    this.center = { lat: -12.0873795, lng: -77.0500079 }
    this.zoom = 12
    this.clearSelection()
  }
  private areCoordinatesEqual(pos1: google.maps.LatLngLiteral, pos2: google.maps.LatLngLiteral): boolean {
    const precision = 0.000001 // Precisión de 6 decimales
    return Math.abs(pos1.lat - pos2.lat) < precision && Math.abs(pos1.lng - pos2.lng) < precision
  }
  isZoneSelected(zona: Zona): boolean {
    return this.selectedZonaId === zona.idZona
  }

  private clearSelection(): void {
    this.selectedZonaId = null
    this.selectedMarkerIndex = -1
  }
  eliminar(id: number): void {
    if (!confirm("¿Estás seguro de que deseas eliminar esta zona?")) return

    this.zS.deleteS(id).subscribe({
      next: () => {
        this.showSuccess("Zona eliminada correctamente")
        this.loadInitialData() // Recargar datos
        if (this.selectedZonaId === id) {
          this.clearSelection()
        }
      },
    })
  }
  private showSuccess(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000,
      panelClass: ["success-snackbar"],
    })
  }
  private showError(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 5000,
      panelClass: ["error-snackbar"],
    })
  }
  private showWarning(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 4000,
      panelClass: ["warning-snackbar"],
    })
  }
  trackByZonaId(index: number, zona: Zona): number {
    return zona.idZona
  }
  trackByMarkerData(index: number, marker: MarkerData): number {
    return marker.zona.idZona
  }
}