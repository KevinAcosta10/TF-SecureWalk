import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ZonaComponent } from './components/zona/zona.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { InsertareditarComponent as EncuestaInsertarEditarComponent} from './components/encuesta/insertareditar/insertareditar.component';
import { InsertareditarComponent as UsuarioInsertarEditarComponent } from './components/usuario/insertareditar/insertareditar.component';
import { InsertareditarComponent as PreguntaInsertarEditarComponent } from './components/pregunta/insertareditar/insertareditar.component';
import { InsertareditarComponent as ZonaInsertarEditarComponent } from './components/zona/insertareditar/insertareditar.component';
import { BuscarusuarioComponent } from './components/usuario/buscarusuario/buscarusuario.component';
import { IncidenteComponent } from './components/incidente/incidente.component';
export const routes: Routes = [
    {
        path: 'usuarios', component: UsuarioComponent,
        children: [
            { path: 'ediciones/:id', component: UsuarioInsertarEditarComponent },
            { path: 'formulario', component: UsuarioInsertarEditarComponent},
            { path:'busquedasporusuario',component:BuscarusuarioComponent }
        ]
    },
    {
        path: 'zonas', component: ZonaComponent,
        children: [
            { path: 'ediciones/:id', component: ZonaInsertarEditarComponent },
            { path: 'formulario', component: ZonaInsertarEditarComponent},
        ]
    },
    {
        path: 'preguntas', component: PreguntaComponent,
        children: [
            { path: 'ediciones/:id', component: PreguntaInsertarEditarComponent },
            { path: 'formulario', component: PreguntaInsertarEditarComponent}
        ]
    },
    {
        path: 'encuestas', component: EncuestaComponent,
        children: [
            { path: 'ediciones/:id', component: EncuestaInsertarEditarComponent },
            { path: 'formulario', component: EncuestaInsertarEditarComponent}
        ]
    },
    {
        path: 'incidentes', component: IncidenteComponent,
    }
];


