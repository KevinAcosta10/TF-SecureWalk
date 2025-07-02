import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ZonaComponent } from './components/zona/zona.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { InsertareditarComponent as EncuestaInsertarEditarComponent } from './components/encuesta/insertareditar/insertareditar.component';
import { InsertareditarComponent as PreguntaInsertarEditarComponent } from './components/pregunta/insertareditar/insertareditar.component';
import { InsertareditarComponent as ZonaInsertarEditarComponent } from './components/zona/insertareditar/insertareditar.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarComponent as RolInsertarEditarComponent } from './components/rol/insertareditar/insertareditar.component';
import { RutaComponent } from './components/ruta/ruta.component';
import { InsertareditarComponent as RutaInsertarEditarComponent } from './components/ruta/insertareditar/insertareditar.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';

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
      { path: 'ediciones/:id', component: ZonaInsertarEditarComponent },
      { path: 'formulario', component: ZonaInsertarEditarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'preguntas',
    component: PreguntaComponent,
    children: [
      { path: 'ediciones/:id', component: PreguntaInsertarEditarComponent },
      { path: 'formulario', component: PreguntaInsertarEditarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'encuestas',
    component: EncuestaComponent,
    children: [
      { path: 'ediciones/:id', component: EncuestaInsertarEditarComponent },
      { path: 'formulario', component: EncuestaInsertarEditarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'roles',
    component: RolComponent,
    children: [
      { path: 'ediciones/:id', component: RolInsertarEditarComponent },
      { path: 'formulario', component: RolInsertarEditarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'rutas',
    component: RutaComponent,
    children: [
      { path: 'ediciones/:id', component: RutaInsertarEditarComponent },
      { path: 'formulario', component: RutaInsertarEditarComponent },
    ],
    canActivate: [seguridadGuard],
  },
    {
    path: 'homes',
    component: HomeComponent,
        canActivate: [seguridadGuard],

  },
];
