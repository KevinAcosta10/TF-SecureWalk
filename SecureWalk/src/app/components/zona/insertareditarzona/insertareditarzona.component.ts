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
        MatOption,
        MatSelectModule,
        GoogleMapsModule,
        MapAdvancedMarker
  ],
  templateUrl: './insertareditarzona.component.html',
  styleUrl: './insertareditarzona.component.css'
})
export class InsertareditarzonaComponent implements OnInit{
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
  }

  markerPosition: google.maps.LatLngLiteral | undefined;

  constructor(
    private zS: ZonaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })


    this.form = this.formBuilder.group({
      codigo: [''],
      latitud: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitud: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
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

    console.log('Latitud:', lat, 'Longitud:', lng);  // Verifica que los valores sean correctos

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
    if (this.form.valid) {
      this.zona.idZona = this.form.value.codigo;
      this.zona.nombreZona = this.form.value.nombre;
      this.zona.latitudZona = parseFloat(this.form.value.latitud);
      this.zona.longitudZona = parseFloat(this.form.value.longitud)

      if (this.edicion) {
        //actualizar
        this.zS.update(this.zona).subscribe(data => {
          this.zS.list().subscribe(data => {
            this.zS.setList(data)
            this.router.navigate(['zonas']);
          })
        })
      } else {
        //INSERTAR
        this.zS.insert(this.zona).subscribe(data => {
          this.zS.list().subscribe(data => {
            this.zS.setList(data)
            this.router.navigate(['zonas'])
          })
        })
      }
    }
  }

  cancelar() {
    this.router.navigate(['zonas']);
  }

  init() {
    if (this.edicion) {
      this.zS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idZona),
          nombre: new FormControl(data.nombreZona),
          latitud: new FormControl(data.latitudZona),
          longitud: new FormControl(data.longitudZona),
        })
        this.updateMarkerPosition();
      })
    }
  }
}
