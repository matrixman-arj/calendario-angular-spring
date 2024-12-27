import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-system',
  templateUrl: './select-system.component.html',
  styleUrl: './select-system.component.scss',
  standalone: true,
    imports: [ MatCardModule,]
})
export class SelectSystemComponent {

  constructor(private router: Router) {}

  navigateTo(system: string): void {
    if (system === 'sisgepess') {
      this.router.navigate(['/sisgepess/login']);
    } else if (system === 'sisagenda') {
      this.router.navigate(['/sisagenda/login']);
    }
  }

}
