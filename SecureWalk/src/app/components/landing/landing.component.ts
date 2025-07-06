import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
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
