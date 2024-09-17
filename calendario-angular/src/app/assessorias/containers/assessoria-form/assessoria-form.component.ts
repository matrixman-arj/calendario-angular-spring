
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessoriasService } from '../../services/assessorias.service';
import { Assessoria } from '../../model/assessoria';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-assessoria-form',
  templateUrl: './assessoria-form.component.html',
  styleUrl: './assessoria-form.component.scss'
})
export class AssessoriaFormComponent implements OnInit {

  // assessoria: Assessoria[] = [];
  assessorias: Assessoria[] = [];
  assessoriasPai: Assessoria[] = [];
  assessoriasFilhas: Assessoria[] = [];

  form: UntypedFormGroup;

  @Output() add = new EventEmitter(false);

  constructor( private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private service: AssessoriasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
  ) {

    this.form = this.formBuilder.group({
      _id: [''],
      descricao: ['', Validators.required],
      sigla: ['', Validators.required],
      assessoriaPai: [null],
      ordem: [null],
      interna: [null]

    });

    this.service.listPai().subscribe((data: any[]) => {
      this.assessoriasPai = data;
     });

  }

  ngOnInit(): void {
    const assessoria: Assessoria = this.route.snapshot.data['assessoria'];

    // Inicializar os controles com patchValue
    this.form.patchValue({
      _id: assessoria._id,
      descricao: assessoria.descricao,
      sigla: assessoria.sigla,
      assessoriaPai: null, // Inicializar como null
      ordem: assessoria.ordem,
      interna: assessoria.interna
    });

    // Carregar a lista de assessorias e atualizar o valor do assessoriaPai
    this.service.list().subscribe(data => {
      this.assessorias = data;

      // Atualizar o assessoriaPai após carregar a lista
      this.form.patchValue({
        assessoriaPai: this.assessorias.find(a => a._id === assessoria.assessoriaPai?._id) || null
      });
    });

    if (assessoria.assessoriaPai && assessoria.assessoriaPai._id) {
      this.service.listFilha(assessoria.assessoriaPai._id).subscribe(data => {
        this.assessoriasFilhas = data;
      });
    }
  }

   // Método para filtrar as assessorias filhas com base na assessoria selecionada
   onAssessoriaChange(assessoria: Assessoria): void {
    this.assessoriasFilhas = this.assessorias.filter(
      a => a.assessoriaPai && a.assessoriaPai._id === assessoria._id
    );
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onAdd(){
    this.add.emit(true);
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Assessoria salva com sucesso!', '', { duration: 3000});
    this.onCancel();
}

private onError() {
  this.dialog.open(ErrorDialogComponent, {
    data: 'Erro ao salvar assessoria.'
  });
}


}


