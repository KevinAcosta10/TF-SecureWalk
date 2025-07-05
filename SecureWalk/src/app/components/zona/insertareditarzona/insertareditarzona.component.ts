import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zona } from '../../../models/zona';
import { ZonaService } from '../../../services/zona.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMapsModule, MapAdvancedMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-insertareditarzona',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    NgIf,
    MatSelectModule,
    GoogleMapsModule,
    MapAdvancedMarker,
    MatButtonModule, // Añadir a imports
    MatIconModule, // Añadir a imports
  ],
  templateUrl: './insertareditarzona.component.html',
  styleUrl: './insertareditarzona.component.css'
})
export class InsertareditarzonaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  zona: Zona = new Zona();

  id: number = 0
  edicion: boolean = false

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.046374, lng: -77.042793 },
    zoom: 12,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] }, // Fondo de mapa más claro
      { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#dadada' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9c9c9' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
    ],
  }

  markerPosition: google.maps.LatLngLiteral | undefined;

  constructor(
    private zS: ZonaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      latitud: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/), Validators.min(-90), Validators.max(90)]], // Añadir min/max para latitud
      longitud: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/), Validators.min(-180), Validators.max(180)]], // Añadir min/max para longitud
      nombre: ['', Validators.required]
    })
    this.form.get('latitud')?.valueChanges.subscribe(lat => {
      this.updateMarkerPosition();
    });

    this.form.get('longitud')?.valueChanges.subscribe(lng => {
      this.updateMarkerPosition();
    });
  }

  updateMarkerPosition(): void {
    const lat = parseFloat(this.form.get('latitud')?.value);
    const lng = parseFloat(this.form.get('longitud')?.value);

    // console.log('Latitud:', lat, 'Longitud:', lng); // Mantener para depuración

    const isValidLat = !isNaN(lat) && lat >= -90 && lat <= 90;
    const isValidLng = !isNaN(lng) && lng >= -180 && lng <= 180;

    if (isValidLat && isValidLng) {
      this.markerPosition = { lat, lng };
      this.mapOptions.center = { lat, lng }; // Centrar el mapa en la nueva posición del marcador
      this.mapOptions.zoom = 15; // Un zoom más cercano cuando se introduce la coordenada
    } else {
      this.markerPosition = undefined; // Borrar el marcador si las coordenadas son inválidas
    }
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, completa todos los campos requeridos y corrige los errores.', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'] // Clase para estilos de error
      });
      return;
    }

    this.zona.idZona = this.form.value.codigo;
    this.zona.nombreZona = this.form.value.nombre;
    this.zona.latitudZona = parseFloat(this.form.value.latitud);
    this.zona.longitudZona = parseFloat(this.form.value.longitud)

    if (this.edicion) {
      //actualizar
      this.zS.update(this.zona).subscribe(data => {
        this.zS.list().subscribe(dataList => {
          this.zS.setList(dataList)
          this.router.navigate(['zonas']);
          this.snackBar.open('Zona actualizada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'] // Clase para estilos de éxito
          });
        })
      }, error => {
        this.snackBar.open('Error al actualizar la zona. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      })
    } else {
      //INSERTAR
      this.zS.insert(this.zona).subscribe(data => {
        this.zS.list().subscribe(dataList => {
          this.zS.setList(dataList)
          this.router.navigate(['zonas'])
          this.snackBar.open('Zona registrada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'] // Clase para estilos de éxito
          });
        })
      }, error => {
        this.snackBar.open('Error al registrar la zona. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      })
    }
  }

  cancelar() {
    this.router.navigate(['zonas']);
  }

  init() {
    if (this.edicion) {
      this.zS.listId(this.id).subscribe(data => {
        this.form.patchValue({ // Usar patchValue en lugar de crear un nuevo FormGroup
          codigo: data.idZona,
          nombre: data.nombreZona,
          latitud: data.latitudZona,
          longitud: data.longitudZona,
        });
        this.updateMarkerPosition();
      })
    }
  }
}