import { CommonModule } from "@angular/common";


import { NgModule } from "@angular/core";
import { CalendariosRoutingModule } from "./calendarios-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { IMaskModule } from "angular-imask";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [



  ],
  imports: [
    CommonModule,
    CalendariosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    IMaskModule

]
})
export class PessoasModule { }
