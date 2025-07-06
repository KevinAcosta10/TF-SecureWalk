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
import { PostComponent } from './components/post/post.component';
import { InsertareditarpostComponent } from './components/post/insertareditarpost/insertareditarpost.component';
import { EncuestapreguntaComponent } from './components/encuestapregunta/encuestapregunta.component';
import { InsertareditarencuestapreguntaComponent } from './components/encuestapregunta/insertareditarencuestapregunta/insertareditarencuestapregunta.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { InsertareditarcomentarioComponent } from './components/comentario/insertareditarcomentario/insertareditarcomentario.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { InsertareditarrespuestaComponent } from './components/respuesta/insertareditarrespuesta/insertareditarrespuesta.component';
import { LandingComponent } from './components/landing/landing.component';
import { EmptyComponent } from './layouts/empty/empty.component';
import { FullComponent } from './layouts/full/full.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { Reporte1Component } from './components/reporte/reporte1/reporte1.component';
import { Reporte2Component } from './components/reporte/reporte2/reporte2.component';
import { Reporte3Component } from './components/reporte/reporte3/reporte3.component';
import { Reporte4Component } from './components/reporte/reporte4/reporte4.component';
import { Reporte5Component } from './components/reporte/reporte5/reporte5.component';
import { Reporte6Component } from './components/reporte/reporte6/reporte6.component';
import { Reporte7Component } from './components/reporte/reporte7/reporte7.component';
import { Reporte8Component } from './components/reporte/reporte8/reporte8.component';
import { Reporte9Component } from './components/reporte/reporte9/reporte9.component';
import { DashboardComponent } from './components/reporte/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: EmptyComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: LandingComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
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
          {
            path: 'ediciones/:id',
            component: InsertareditarincidenteComponent,
          },
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
          {
            path: 'formulario',
            component: InsertarevaluacionincidenteComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'usuarioRutas',
        component: UsuariorutaComponent,
        children: [
          {
            path: 'ediciones/:id',
            component: InsertareditarusuariorutaComponent,
          },
          { path: 'formulario', component: InsertareditarusuariorutaComponent },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'posts',
        component: PostComponent,
        children: [
          { path: 'ediciones/:id', component: InsertareditarpostComponent },
          { path: 'formulario', component: InsertareditarpostComponent },
        ],
        canActivate: [seguridadGuard],
      },

      {
        path: 'encuestasPreguntas',
        component: EncuestapreguntaComponent,
        children: [
          {
            path: 'ediciones/:id',
            component: InsertareditarencuestapreguntaComponent,
          },
          {
            path: 'formulario',
            component: InsertareditarencuestapreguntaComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'comentarios',
        component: ComentarioComponent,
        children: [
          {
            path: 'ediciones/:id',
            component: InsertareditarcomentarioComponent,
          },
          { path: 'formulario', component: InsertareditarcomentarioComponent },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'respuestas',
        component: RespuestaComponent,
        children: [
          {
            path: 'ediciones/:id',
            component: InsertareditarrespuestaComponent,
          },
          { path: 'formulario', component: InsertareditarrespuestaComponent },
        ],
        canActivate: [seguridadGuard],
      },

      {
        path: 'homes',
        component: HomeComponent,
        canActivate: [seguridadGuard],
      },
      {
    path: 'reportes',
    component: ReporteComponent,
    children: [
      {
        path: 'reporte1',
        component: Reporte1Component,
      },
      {
        path: 'reporte2',
        component: Reporte2Component,
      },
      {
        path: 'reporte3',
        component: Reporte3Component,
      },
      {
        path: 'reporte4',
        component: Reporte4Component,
      },
      {
        path: 'reporte5',
        component: Reporte5Component,
      },
      {
        path: 'reporte6',
        component: Reporte6Component,
      },
      {
        path: 'reporte7',
        component: Reporte7Component,
      },
      {
        path: 'reporte8',
        component: Reporte8Component,
      },
      {
        path: 'reporte9',
        component: Reporte9Component,
      },
      {
        path: 'Dashboard',
        component: DashboardComponent,
      },
    ],
        canActivate: [seguridadGuard],

  },
    ],
  },
];
