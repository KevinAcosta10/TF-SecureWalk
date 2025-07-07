import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-menu',
    imports: [MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        CommonModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isCLIENTE() {
    return this.role === 'CLIENTE';
  }

  isPOLICIA() {
    return this.role === 'POLICIA';
  }

  isADMIN() {
    return this.role === 'ADMIN';
  }
}
