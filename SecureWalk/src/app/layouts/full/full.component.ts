import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
    selector: 'app-full',
    imports: [RouterOutlet, MenuComponent],
    templateUrl: './full.component.html',
    styleUrl: './full.component.css'
})
export class FullComponent {

}
