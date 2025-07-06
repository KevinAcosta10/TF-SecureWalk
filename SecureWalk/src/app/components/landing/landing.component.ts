import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar'; // Mantener MatToolbarModule
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { MatGridListModule } from '@angular/material/grid-list'; // Quitar si no se usa
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
// import { RouterOutlet } from '@angular/router'; // Quitar si no se usa

// Añadir CommonModule para directivas estructurales (*ngIf, *ngFor) si fuera necesario
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true, // Asumo que es un componente standalone
  imports: [
    CommonModule, // Asegúrate de que CommonModule esté aquí
    MatDialogModule,
    MatToolbarModule, // Confirmado que se mantiene
    MatButtonModule,
    MatCardModule,
    // MatGridListModule, // Eliminar si no se usa
    MatIconModule,
    RouterLink,
    // RouterOutlet, // Eliminar si no se usa
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  @ViewChild('aboutDialog') aboutDialog!: TemplateRef<any>;
  @ViewChild('termsDialog') termsDialog!: TemplateRef<any>;
  @ViewChild('privacyDialog') privacyDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  openAboutDialog(event?: Event): void {
    if (event) event.preventDefault();
    this.dialog.open(this.aboutDialog);
  }

  openTermsDialog(event?: Event): void {
    if (event) event.preventDefault();
    this.dialog.open(this.termsDialog);
  }

  openPrivacyDialog(event?: Event): void {
    if (event) event.preventDefault();
    this.dialog.open(this.privacyDialog);
  }
}