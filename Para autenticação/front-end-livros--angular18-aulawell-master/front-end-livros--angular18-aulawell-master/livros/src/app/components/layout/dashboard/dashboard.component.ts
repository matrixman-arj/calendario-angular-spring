import { Component } from '@angular/core';
import { GraficoComponent } from '../grafico/grafico.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GraficoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
