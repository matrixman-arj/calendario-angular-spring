import { RouterModule, Routes } from "@angular/router";
import { CalendariosComponent } from "./calendarios.component";
import { NgModule } from "@angular/core";
import { CalendariosResolver } from "./guards/calendario.resolver";

const routes: Routes = [
  { path: '', component: CalendariosComponent},
  { path: 'new', component: CalendariosComponent, resolve:{calendarios: CalendariosResolver}},
  { path: 'edit/:id', component: CalendariosComponent, resolve:{calendarios: CalendariosResolver}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendariosRoutingModule { }
