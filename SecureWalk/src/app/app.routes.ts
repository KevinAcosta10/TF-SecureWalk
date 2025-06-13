import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { ZonaComponent } from './components/zona/zona.component';
import { ListarzonaComponent } from './components/zona/listarzona/listarzona.component';
import { ListarpreguntaComponent } from './components/pregunta/listarpregunta/listarpregunta.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ListarencuestaComponent } from './components/encuesta/listarencuesta/listarencuesta.component';
import { InsertareditarComponent as EncuestaInsertarEditarComponent} from './components/encuesta/insertareditar/insertareditar.component';
import { InsertareditarComponent as UsuarioInsertarEditarComponent } from './components/usuario/insertareditar/insertareditar.component';
import { InsertareditarComponent as PreguntaInsertarEditarComponent } from './components/pregunta/insertareditar/insertareditar.component';
import { InsertareditarComponent as ZonaInsertarEditarComponent } from './components/zona/insertareditar/insertareditar.component';
export const routes: Routes = [
    {
        path: 'usuarios', component: UsuarioComponent,
        children: [
            { path: 'listar', component: ListarusuarioComponent },
            { path: 'insertar', component: UsuarioInsertarEditarComponent}
        ]

    },
    {
        path: 'zonas', component: ZonaComponent,
        children: [
            { path: 'listar', component: ListarzonaComponent },
            { path: 'insertar', component: ZonaInsertarEditarComponent}
        ]
    },
    {
        path: 'preguntas', component: PreguntaComponent,
        children: [
            { path: 'listar', component: ListarpreguntaComponent },
            { path: 'insertar', component: PreguntaInsertarEditarComponent}
        ]
    },
    {
        path: 'encuestas', component: EncuestaComponent,
        children: [
            { path: 'listar', component: ListarencuestaComponent },
            { path: 'insertar', component: EncuestaInsertarEditarComponent}
        ]
    }
];


