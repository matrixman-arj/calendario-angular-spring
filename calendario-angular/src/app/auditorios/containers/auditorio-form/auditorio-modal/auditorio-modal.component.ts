import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Pessoa } from '../../../../pessoas/model/pessoa';
import { Assessoria } from '../../../../assessorias/model/assessoria';
import { AssessoriasService } from '../../../../assessorias/services/assessorias.service';
import { PessoasService } from '../../../../pessoas/services/pessoas.service';
import { AcessoriosList } from '../../../../enums/Acessorios/Acessorios';

import { ActivatedRoute } from '@angular/router';
import { AuditoriosService } from '../../../services/auditorios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog/error-dialog.component';
import { CommonModule, Location } from '@angular/common';
import { DateTime } from 'luxon';
import { Auditorio } from '../../../modelo/Auditorio';
import { PessoaPage } from '../../../../pessoas/model/pessoa-page';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { LoginService } from '../../../../login/auth/login.service';


@Component({
    selector: 'app-auditorio-modal',
    templateUrl: './auditorio-modal.component.html',
    styleUrl: './auditorio-modal.component.scss',
    standalone: true,
    imports: [MatDialogContent, FormsModule, CommonModule ,ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatDialogActions, MatButton]
})
export class AuditorioModalComponent implements OnInit {

  isAdmin: boolean = false;

  isHidden: boolean = true;

  form: UntypedFormGroup;

  isSubmitting = false; // Adicione uma variável para controlar o estado de submissão

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() onAgendamentoConfirmado: EventEmitter<void> = new EventEmitter<void>();

  pessoas: Pessoa [] = [];
  assessorias: Assessoria [] = [];

  pessoasOriginais: Pessoa[] = []; // Array com todos os registros originais

  acessorios = AcessoriosList; // Lista de acessórios
  allSelected: boolean = false; // Flag para verificar se todos estão selecionados
  dateHoje: any;
  dateSelecionada: string | undefined;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private auditoriosService: AuditoriosService,
    private assessoriasService: AssessoriasService,
    private pessoasService: PessoasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AuditorioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { auditorio: Auditorio, date: Date },
    private loginService: LoginService
  ) {
    // Inicializa `this.dateHoje` com a data atual
  this.dateSelecionada = this.data.date.toLocaleString(); // Usando Luxon para obter a data atual em formato ISO
    if(this.data.auditorio){
      this.form = this.formBuilder.group({
        _id: [''],
        dataInicio: [''], // Certifique-se de que está capturando uma data válida
        dataFim: [''],
        horaInicio: ['', Validators.required], // Deve capturar uma string de hora
        horaFim: ['', Validators.required], // Deve capturar uma string de hora
        pessoa: [null], // Captura o ID da pessoa
        assessoria: [null], // Captura o ID da assessoria
        acessorios: [[]], // Captura uma lista de acessórios
        audiencia: [null, Validators.required],
        evento: [null, Validators.required],
        diex: [null, Validators.required],
        militarLigacao: [null, Validators.required],
        confirmado: [false]
      });
    } else {
      const dataSelecionada = new Date(this.data.date);
      const dataFormatada = dataSelecionada.toISOString().substring(0, 10); // 'yyyy-MM-dd'
      this.dateSelecionada = this.data.date.toLocaleString(); // Usando Luxon para obter a data atual em formato ISO
      this.form = this.formBuilder.group({
        dataInicio: [ dataFormatada], // formato 'YYYY-MM-DD' para o input type="date"
        dataFim: [dataFormatada],
        horaInicio: ['', Validators.required], // Deve capturar uma string de hora
        horaFim: ['', Validators.required], // Deve capturar uma string de hora
        pessoa: [null], // Captura o ID da pessoa
        assessoria: [null], // Captura o ID da assessoria
        acessorios: [[]], // Captura uma lista de acessórios
        audiencia: [null, Validators.required],
        evento: [null, Validators.required],
        diex: [null, Validators.required],
        militarLigacao: [null, Validators.required],
        confirmado: [false]
      });
    }

    this.assessoriasService.list().subscribe((data: any[]) => {
      this.assessorias = data;
      console.log(data)
     });

     this.pessoasService.list().subscribe((data: PessoaPage) => {
      this.pessoas = data.pessoas;
     });

     this.pessoasService.listPessCompl().subscribe((data: any[]) => {
      this.pessoas = data;
     });
  }

  comparePessoa(p1: Pessoa, p2: Pessoa): boolean {
    return p1 && p2 ? p1._id === p2._id : p1 === p2;
  }


  ngOnInit(): void {
    const user = this.loginService.getCurrentUser();
    if (user) {
        this.isAdmin = user.role === 'ADMINISTRADOR' || user.role === 'AGENDAMENTO';
    }
    this.checkAdminRole();
    // Verifique se o auditorio foi passado
  const auditorio: Auditorio | undefined = this.data.auditorio;
  this.dateSelecionada = this.data.date.toLocaleString(); // Usando Luxon para obter a data atual em formato ISO
    // const id = this.data.auditorio._id
    if (auditorio) {
      // Se for edição, preencha o formulário com os dados do auditorio
      this.form.patchValue({
        _id: auditorio.id || null,
        dataInicio: auditorio.dataInicio ||  '',
        dataFim: auditorio.dataFim || '',
        horaInicio: auditorio.horaInicio || '',
        horaFim: auditorio.horaFim || '',
        pessoa: auditorio.pessoa ? auditorio.pessoa._id : '', // Preencha com o ID da pessoa
        assessoria: auditorio.assessoria ? auditorio.assessoria._id : '', // Preencha com o ID da assessoria
        acessorios: auditorio.acessorios || [],
        audiencia: auditorio.audiencia || '',
        evento: auditorio.evento || '',
        diex: auditorio.diex || '',
        militarLigacao: auditorio.militarLigacao || '',
        confirmado: auditorio.confirmado || false,
      });
      console.log("Pegando auditorio antes de salvar: ", auditorio)
      console.log(this.form.value)
    } else {
      // console.log("Data selecionada:", this.dateSelecionada)
      // Valores padrão se não houver auditorio existente
      const dataSelecionada = new Date(this.data.date);
      const dataFormatada = dataSelecionada.toISOString().substring(0, 10); // 'yyyy-MM-dd'
      this.dateSelecionada = this.data.date.toLocaleString(); // Usando Luxon para obter a data atual em formato ISO
      this.form.setValue({

        // _id: null,
        dataInicio: dataFormatada,
        dataFim: dataFormatada,
        horaInicio: '',
        horaFim: '',
        pessoa: '',
        assessoria: '',
        acessorios: '',
        audiencia: '',
        evento: '',
        diex: '',
        militarLigacao: '',
        confirmado: false,

      });

       // Log para verificar se o ID está sendo passado
  console.log('Auditorio recebido no modal:', auditorio);
    }

    // Escuta mudanças no campo "pessoa"
    this.form.get('pessoa')?.valueChanges.subscribe((selectedPessoa: Pessoa) => {
      if (selectedPessoa && selectedPessoa.assessoria && selectedPessoa.assessoria._id) {
        // Atualiza o campo "assessoria" com a assessoria da pessoa selecionada
        this.form.patchValue({ assessoria: selectedPessoa.assessoria._id });
      }
    });

    this.pessoasService.listPessCompl().subscribe((data: Pessoa[]) => {
      this.pessoas = data;
      this.pessoasOriginais = [...data]; // Clona os dados originais
    });
  }

  checkAdminRole(): void {
    const user = this.loginService.getCurrentUser(); // Substitua pelo método que retorna o usuário atual
    this.isAdmin = user?.role === 'ADMINISTRADOR' || user?.role === 'AGENDAMENTO';
  }

  confirmarAgendamento(): void {
    const agendamentoId = this.form.value._id;
    console.log('Agendamento ID:', agendamentoId); // Certifique-se de que o 'id' está preenchido
    if (!agendamentoId) {
        console.error('Agendamento ID está indefinido.');
        return;
    }
    this.auditoriosService.confirmarAgendamento(agendamentoId).subscribe({
        next: () => {
            console.log('Agendamento confirmado com sucesso!');
            alert('Agendamento confirmado com sucesso!');
            this.onAgendamentoConfirmado.emit(); // Emite o evento de confirmação para o componente pai que é o auditorio-form
            this.dialogRef.close();
            window.location.reload();


        },
        error: (err) => {
            console.error('Erro ao confirmar agendamento:', err);
        },
    });
}


  // confirmarAgendamento(): void {
  //   const agendamentoId = this.form.value.id;
  //   this.auditoriosService.confirmarAgendamento(agendamentoId).subscribe(() => {
  //     this.form.patchValue({ confirmado: true });
  //     this.dialogRef.close();
  //   });
  // }


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
  //   this.auditoriosService.save(this.form.value)
  //   .subscribe(result => this.onSuccess(), error => this.onError());

  // }



  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Depurando o valor de dataInicio
      console.log('Valor de dataInicio antes de enviar:', this.form.value.dataInicio);

      const auditorio = {
        ...this.form.value,
        id: this.form.value._id, // Certifique-se de que o ID está sendo enviado corretamente
        // dataInicio: this.dateSelecionada, // Formata a data corretamente
        confirmado: this.form.value.confirmado,
        pessoa: { _id: this.form.value.pessoa }, // Certifique-se de que está enviando o _id da pessoa
        assessoria: { _id: this.form.value.assessoria }, // Certifique-se de que está enviando o _id da assessoria
        acessorios: this.form.value.acessorios // Acessórios continuam como estão
      };
      console.log(auditorio)

      this.auditoriosService.save(auditorio).subscribe(

        result => {
          this.snackBar.open('Auditorio salvo com sucesso!', '', { duration: 5000 });
          this.dialogRef.close(result); // Fecha o modal
          this.edit.emit(); // Emite um evento para o componente pai
          this.isSubmitting = false;
          console.log('Dados do formulário antes de salvar:', auditorio);
          console.log('dataInicio:', this.form.value.dataInicio);
        },
        error => {
          this.snackBar.open('Erro ao salvar auditorio!', '', { duration: 5000 });
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

  onEdit(auditorio: Auditorio ){
    this.edit.emit(auditorio);
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Auditorio salva com successo!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao tentar realisar auditorio .'
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
