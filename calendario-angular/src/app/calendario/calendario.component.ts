import { Component } from "@angular/core";
import { CalendarEvent } from "angular-calendar";
import { Subject } from "rxjs";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent {
  viewDays: number = 7; // Inicia com visualização de uma semana
  viewDate: Date = new Date(); // Data atual
  events: CalendarEvent[] = []; // Eventos do calendário
  locale: string = 'pt'; // Localidade (Português)
  weekStartsOn: number = 1; // Semana começa na segunda-feira
  excludeDays: number[] = []; // Dias excluídos
  startsWithToday: boolean = true; // Começa com a data de hoje
  hourSegments: number = 4; // Segmentos por hora (15 minutos)
  dayStartHour: number = 6; // Início do dia às 6h
  dayEndHour: number = 22; // Fim do dia às 22h
  refresh: Subject<any> = new Subject(); // Para atualizar o calendário

  // Métodos para lidar com as interações do calendário
  viewDaysOptionChanged(viewDays: number): void {
    this.viewDays = viewDays;
    this.refresh.next(true); // Atualiza o calendário
  }

  viewDaysChanged(event: any): void {
    // Lógica para lidar com mudança de visualização
  }

  dayHeaderClicked(day: any): void {
    // Lógica para lidar com o clique no cabeçalho do dia
  }

  hourClicked(hour: any): void {
    // Lógica para lidar com o clique na hora
  }

  segmentClicked(action: string, segment: any): void {
    // Lógica para lidar com o clique no segmento da hora
  }

  eventClicked(action: string, event: any): void {
    // Lógica para lidar com o clique no evento
  }

  eventTimesChanged(event: any): void {
    // Lógica para lidar com a alteração no tempo do evento
  }
}
