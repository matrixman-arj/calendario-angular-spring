import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Pessoa } from '../../../../pessoas/model/pessoa';
import { Assessoria } from '../../../../assessorias/model/assessoria';
import { AssessoriasService } from '../../../../assessorias/services/assessorias.service';
import { PessoasService } from '../../../../pessoas/services/pessoas.service';
import { AcessoriosList } from '../../../../enums/Acessorios/Acessorios';

import { ActivatedRoute } from '@angular/router';
import { AgendamentosService } from '../../../services/agendamentos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { DateTime } from 'luxon';
import { Agendamento } from '../../../modelo/Agendamento';


@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrl: './agendamento-modal.component.scss'
})
export class AgendamentoModalComponent implements OnInit {

  form: UntypedFormGroup;

  isSubmitting = false; // Adicione uma variável para controlar o estado de submissão

  @Output() add = new EventEmitter(false);

  pessoas: Pessoa [] = [];
  assessorias: Assessoria [] = [];

  acessorios = AcessoriosList; // Lista de acessórios
  allSelected: boolean = false; // Flag para verificar se todos estão selecionados
  dateHoje: any;


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
    @Inject(MAT_DIALOG_DATA) public data: { agendamento: Agendamento, date: Date }
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      data: [this.dateHoje], // Certifique-se de que está capturando uma data válida
      horaInicio: ['', Validators.required], // Deve capturar uma string de hora
      horaFim: ['', Validators.required], // Deve capturar uma string de hora
      pessoa: [null], // Captura o ID da pessoa
      assessoria: [null], // Captura o ID da assessoria
      acessorios: [[]], // Captura uma lista de acessórios
      audiencia: [null, Validators.required],
      evento: [null, Validators.required],
      diex: [null, Validators.required],
      militarLigacao: [null, Validators.required]
    });


    this.assessoriasService.list().subscribe((data: any[]) => {
      this.assessorias = data;
      console.log(data)
     });

     this.pessoasService.list().subscribe((data: any[]) => {
      this.pessoas = data;
     });
  }

  comparePessoa(p1: Pessoa, p2: Pessoa): boolean {
    return p1 && p2 ? p1._id === p2._id : p1 === p2;
  }


  ngOnInit(): void {
    // Verifique se o agendamento foi passado
  const agendamento: Agendamento | undefined = this.data.agendamento;

  if (agendamento) {
    // Se for edição, preencha o formulário com os dados do agendamento
    this.form.patchValue({
      _id: agendamento._id || '',
      data: agendamento.data || '',
      horaInicio: agendamento.horaInicio || '',
      horaFim: agendamento.horaFim || '',
      pessoa: agendamento.pessoa ? agendamento.pessoa._id : '', // Preencha com o ID da pessoa
      assessoria: agendamento.assessoria ? agendamento.assessoria._id : '', // Preencha com o ID da assessoria
      acessorios: agendamento.acessorios || [],
      audiencia: agendamento.audiencia || '',
      evento: agendamento.evento || '',
      diex: agendamento.diex || '',
      militarLigacao: agendamento.militarLigacao || ''
    });
    } else {
      // Valores padrão se não houver agendamento existente
      this.form.setValue({
        _id: '',
        data: this.data.date || '',
        horaInicio: '',
        horaFim: '',
        pessoa: '',
        assessoria: '',
        acessorios: '',
        audiencia: '',
        evento: '',
        diex: '',
        militarLigacao: ''
      });

       // Log para verificar se o ID está sendo passado
  console.log('Agendamento recebido no modal:', agendamento);
    }

    // Escuta mudanças no campo "pessoa"
    this.form.get('pessoa')?.valueChanges.subscribe((selectedPessoa: Pessoa) => {
      if (selectedPessoa && selectedPessoa.assessoria && selectedPessoa.assessoria._id) {
        // Atualiza o campo "assessoria" com a assessoria da pessoa selecionada
        this.form.patchValue({ assessoria: selectedPessoa.assessoria._id });
      }
    });
  }

  // Escutar mudanças no campo 'pessoa'
onPessoaChange(pessoaId: string): void {
  // Encontre a pessoa selecionada a partir da lista de pessoas
  const selectedPessoa = this.pessoas.find(pessoa => pessoa._id === pessoaId);

  // Se a pessoa tiver uma assessoria associada, atualize o campo 'assessoria'
  if (selectedPessoa && selectedPessoa.assessoria) {
    this.form.patchValue({ assessoria: selectedPessoa.assessoria._id });
  } else {
    // Se a pessoa não tiver assessoria, deixe o campo vazio ou com algum valor padrão
    this.form.patchValue({ assessoria: null });
  }
}



// Função para garantir que a data seja formatada corretamente
formatDate(date: any): string {
  if (date instanceof DateTime) {
      // Se for DateTime de Luxon, usar toISODate e tratar caso retorne null
      return date.toISODate() ?? ''; // Usa uma string vazia se for null
  } else if (date instanceof Date) {
      // Se for Date nativo do JavaScript, formata manualmente
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
  return ''; // Valor padrão se a data estiver indefinida ou em formato desconhecido
}




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



  // onSubmit() {
  //   this.agendamentosService.save(this.form.value)
  //   .subscribe(result => this.onSuccess(), error => this.onError());

  // }



  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const agendamento = {
        ...this.form.value,
        _id: this.form.value._id, // Certifique-se de que o ID está sendo enviado corretamente
        data: this.formatDate(this.form.value.data), // Formata a data corretamente
        pessoa: { _id: this.form.value.pessoa }, // Certifique-se de que está enviando o _id da pessoa
        assessoria: { _id: this.form.value.assessoria }, // Certifique-se de que está enviando o _id da assessoria
        acessorios: this.form.value.acessorios // Acessórios continuam como estão
      };

      this.agendamentosService.save(agendamento).subscribe(

        result => {
          this.snackBar.open('Agendamento salvo com sucesso!', '', { duration: 5000 });
          this.dialogRef.close(result); // Fecha o modal
          this.isSubmitting = false;
          console.log('Dados do formulário antes de salvar:', this.form.value);
        },
        error => {
          this.snackBar.open('Erro ao salvar agendamento!', '', { duration: 5000 });
          this.isSubmitting = false;
        }
      );
    }
  }


// Função para formatar a data usando Luxon
// formatDate(date: any): string {
//   return DateTime.fromISO(date).toFormat('yyyy-MM-dd'); // Usa Luxon para formatar
// }


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
