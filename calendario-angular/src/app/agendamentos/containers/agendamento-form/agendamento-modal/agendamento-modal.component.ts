import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Pessoa } from '../../../../pessoas/model/pessoa';
import { Assessoria } from '../../../../assessorias/model/assessoria';
import { AssessoriasService } from '../../../../assessorias/services/assessorias.service';
import { PessoasService } from '../../../../pessoas/services/pessoas.service';
import { Acessorios, AcessoriosList } from '../../../../enums/Acessorios/Acessorios';
import { Agendamento } from '../../../modelo/Agendamento';
import { ActivatedRoute } from '@angular/router';
import { AgendamentosService } from '../../../services/agendamentos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrl: './agendamento-modal.component.scss'
})
export class AgendamentoModalComponent implements OnInit {

  form: UntypedFormGroup;

  @Output() add = new EventEmitter(false);

  pessoas: Pessoa [] = [];
  assessorias: Assessoria [] = [];

  acessorios = AcessoriosList; // Lista de acessórios
  allSelected: boolean = false; // Flag para verificar se todos estão selecionados

  constructor(
    private formBuilder: UntypedFormBuilder,
    private agendamentosService: AgendamentosService,
    private assessoriasService: AssessoriasService,
    private pessoasService: PessoasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AgendamentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
       _id: [''],
      data: [data.date, Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      pessoa: ['', Validators.required],
      assessoria: ['', Validators.required],
      acessorios: [[], Validators.required],
      audiencia: [null, Validators.required],
      evento: [null, Validators.required],
      diex: [null, Validators.required],
      militarLigacao: [null, Validators.required]
    });

    this.assessoriasService.list().subscribe((data: any[]) => {
      this.assessorias = data;
     });

     this.pessoasService.list().subscribe((data: any[]) => {
      this.pessoas = data;
     });



  }
  ngOnInit(): void {

    //Aqui recebe o formulario que chamado agendamento
    const agendamento = { ...this.form.value };

    //Desse formulário, pegamos o valor do campo data e transformamos em dia/mês/ano
    agendamento.data = DateTime.fromISO(agendamento.data).toFormat('yyyy-MM-dd');



  if (agendamento) {
    this.form.setValue({
      _id: agendamento._id || '',
      data: agendamento.data || '', // Usa a data passada no modal
      horaInicio: agendamento.horaInicio || '',
      horaFim: agendamento.horaFim || '',
      pessoa: agendamento.pessoa || null,
      assessoria: agendamento.assessoria || null,// Ajustado para lidar com o ID da assessoria
      acessorios: agendamento.acessorios || '',
      audiencia: agendamento.audiencia || '',
      evento: agendamento.evento || '',
      diex: agendamento.diex || '',
      militarLigacao: agendamento.militarLigacao || '',
    });
  } else {
    // Caso seja um novo agendamento
    this.form.setValue({
      _id: '',
      data: '', // Usa apenas a data passada no modal
      horaInicio: '',
      horaFim: '',
      assessoria: '',
      pessoa: '',
      acessorios: '',
      audiencia: '',
      evento: '',
      diex: '',
      militarLigacao: '',
    });
  }

   // Escuta mudanças no campo "pessoa"
  this.form.get('pessoa')?.valueChanges.subscribe((selectedPessoa: Pessoa) => {
    if (selectedPessoa && selectedPessoa.assessoria._id) {
      // Atualiza o campo "assessoria" com a assessoria da pessoa selecionada
      this.form.patchValue({ assessoria: selectedPessoa.assessoria._id });
    }
  });

}


  // Lógica para alternar a seleção de todos os acessórios
  // toggleAllAcessorios() {
  //   this.allSelected = !this.allSelected; // Alterna o estado de todos selecionados

  //   if (this.allSelected) {
  //     // Seleciona todos os valores do enum (como strings)
  //     this.form.controls['acessorios'].setValue(this.acessorios.map(acessorio => acessorio.viewValue));
  //   } else {
  //     // Desseleciona todos os acessórios
  //     this.form.controls['acessorios'].setValue([]);
  //   }
  // }


  // toggleAllAcessorios() {
  //   this.allSelected = !this.allSelected; // Alterna o estado de todos selecionados
  //   if (this.allSelected) {
  //     // Seleciona todos os acessórios
  //     this.form.controls['acessorios'].setValue([...this.acessorios]);
  //   } else {
  //     // Desseleciona todos os acessórios
  //     this.form.controls['acessorios'].setValue([]);
  //   }
  // }



  // Verifica se um acessório específico está selecionado
  isAcessorioSelected(acessorio: any): boolean {
    const selectedAcessorios = this.form.controls['acessorios'].value;
    return selectedAcessorios.includes(acessorio);
  }

  // Função chamada quando a seleção de acessórios muda
  onAcessoriosChange(event: any) {
    const selectedAcessorios = event.value;
    this.allSelected = selectedAcessorios.length === this.acessorios.length;
  }

  onSubmit() {
    if (this.form.valid) {

    const agendamento = {
      ...this.form.value,
      //pessoa: {_id: this.form.value.pessoa._id} , // Ajustando o formato da pessoa
      assessoria: { _id: this.form.value.assessoria }, // Ajustando o formato da assessoria
      acessorios: this.form.value.acessorios.map((a: any) => a) // Certificando que acessorios estão em formato correto
    };

    this.dialogRef.close(agendamento);

    this.agendamentosService.save(agendamento)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }
  }
  onAdd(){
    this.add.emit(true);
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Agendamento salva com successo!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao tentar realisar agendamento .'
    });
  }

  errorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')){
      return 'Campo obrigatório';

    }
    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caractéres.`;

    }

    if (field?.hasError('pattern')){
      const requiredPattern = field.errors ? field.errors['pattern']['requiredPattern'] : '000.000.000-0';
      return `O campo só pode conter ${requiredPattern} como valores.`;

    }

    return 'Campo inválido';
    // return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }

}
