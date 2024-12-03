import { Routes } from "@angular/router";
import { VideoConferenciaFormComponent } from "./containers/videoConferencia-form/videoConferencia-form.component";
import { VideoConferenciasComponent } from "./containers/videoConferencias/videoConferencias.component";
import { VideoConferenciaResolver } from "./guards/videoConferencia.resolver";

export const VIDEOCONFERENCIAS_ROUTES: Routes = [
  { path: '', component: VideoConferenciasComponent},
  { path: 'new', component: VideoConferenciaFormComponent, resolve:{videoConferencia: VideoConferenciaResolver}},
  { path: 'edit/:id', component: VideoConferenciaFormComponent, resolve:{videoConferencia: VideoConferenciaResolver}}

];
