import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { ZonaComponent } from './components/zona/zona.component';
import { ListarzonaComponent } from './components/zona/listarzona/listarzona.component';
import { ListarpreguntaComponent } from './components/pregunta/listarpregunta/listarpregunta.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ListarencuestaComponent } from './components/encuesta/listarencuesta/listarencuesta.component';

export const routes: Routes = [
    {
        path: 'usuarios', component: UsuarioComponent,
        children: [
            { path: 'listar', component: ListarusuarioComponent }
        ]

    },
    {
        path: 'zonas', component: ZonaComponent,
        children: [
            { path: 'listar', component: ListarzonaComponent }
        ]
    },
    {
        path: 'preguntas', component: PreguntaComponent,
        children: [
            { path: 'listar', component: ListarpreguntaComponent }
        ]
    },
    {
        path: 'encuestas', component: EncuestaComponent,
        children: [
            { path: 'listar', component: ListarencuestaComponent }
        ]
    }
];


