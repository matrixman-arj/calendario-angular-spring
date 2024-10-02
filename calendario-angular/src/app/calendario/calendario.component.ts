import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { AgendamentoModalComponent } from '../agendamentos/containers/agendamento-form/agendamento-modal/agendamento-modal.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(public dialog: MatDialog) {}

  addNewEvent(): void {
    const dialogRef = this.dialog.open(AgendamentoModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.events = [
          ...this.events,
          {
            title: result.title,
            start: result.start,
            end: result.end,
            color: {
              primary: '#ad2121',
              secondary: '#FAE3E3',
            },
          },
        ];
      }
    });
  }

  handleEvent(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(AgendamentoModalComponent, {
      width: '400px',
      data: event,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        event.title = result.title;
        event.start = result.start;
        event.end = result.end;
      }
    });
  }

}
