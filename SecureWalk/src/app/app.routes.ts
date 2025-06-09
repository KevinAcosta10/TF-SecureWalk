import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';

export const routes: Routes = [
    {
        path:'usuarios',component:UsuarioComponent,
        children: [
            {
                path: 'listar', component: ListarusuarioComponent
            }
        ]
    }
];
