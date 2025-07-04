import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ZonaComponent } from './components/zona/zona.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { RolComponent } from './components/rol/rol.component';
import { RutaComponent } from './components/ruta/ruta.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { InsertareditarzonaComponent } from './components/zona/insertareditarzona/insertareditarzona.component';
import { InsertareditarrutaComponent } from './components/ruta/insertareditarruta/insertareditarruta.component';
import { InsertareditarrolComponent } from './components/rol/insertareditarrol/insertareditarrol.component';
import { InsertareditarencuestaComponent } from './components/encuesta/insertareditarencuesta/insertareditarencuesta.component';
import { InsertareditarpreguntaComponent } from './components/pregunta/insertareditarpregunta/insertareditarpregunta.component';
import { IncidenteComponent } from './components/incidente/incidente.component';
import { InsertareditarincidenteComponent } from './components/incidente/insertareditarincidente/insertareditarincidente.component';
import { EvaluacionincidenteComponent } from './components/evaluacionincidente/evaluacionincidente.component';
import { InsertarevaluacionincidenteComponent } from './components/evaluacionincidente/insertarevaluacionincidente/insertarevaluacionincidente.component';
import { UsuariorutaComponent } from './components/usuarioruta/usuarioruta.component';
import { InsertareditarusuariorutaComponent } from './components/usuarioruta/insertareditarusuarioruta/insertareditarusuarioruta.component';
import { EncuestapreguntaComponent } from './components/encuestapregunta/encuestapregunta.component';
import { InsertareditarencuestapreguntaComponent } from './components/encuestapregunta/insertareditarencuestapregunta/insertareditarencuestapregunta.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarusuarioComponent },
      { path: 'formulario', component: InsertareditarusuarioComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'zonas',
    component: ZonaComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarzonaComponent },
      { path: 'formulario', component: InsertareditarzonaComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'preguntas',
    component: PreguntaComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarpreguntaComponent },
      { path: 'formulario', component: InsertareditarpreguntaComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'encuestas',
    component: EncuestaComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarencuestaComponent },
      { path: 'formulario', component: InsertareditarencuestaComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'roles',
    component: RolComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarrolComponent },
      { path: 'formulario', component: InsertareditarrolComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'rutas',
    component: RutaComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarrutaComponent },
      { path: 'formulario', component: InsertareditarrutaComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'incidentes',
    component: IncidenteComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarincidenteComponent },
      { path: 'formulario', component: InsertareditarincidenteComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'evaluacionincidentes',
    component: EvaluacionincidenteComponent,
    children: [
      {
        path: 'ediciones/:id',
        component: InsertarevaluacionincidenteComponent,
      },
      { path: 'formulario', component: InsertarevaluacionincidenteComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'usuarioRutas',
    component: UsuariorutaComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarusuariorutaComponent },
      { path: 'formulario', component: InsertareditarusuariorutaComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'encuestasPreguntas',
    component: EncuestapreguntaComponent,
    children: [
      { path: 'ediciones/:id', component: InsertareditarencuestapreguntaComponent },
      { path: 'formulario', component: InsertareditarencuestapreguntaComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard],
  },
];
