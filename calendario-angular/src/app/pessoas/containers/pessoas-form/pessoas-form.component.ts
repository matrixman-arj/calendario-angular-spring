import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Assessoria } from '../../../assessorias/model/assessoria';
import { AssessoriasService } from '../../../assessorias/services/assessorias.service';
import { PostoGraduacao, PostoGraduacaoList } from '../../../enums/PostoGraduacao/PostoGraduacao';
import { TipoAcesso, TipoAcessoList } from '../../../enums/TipoAcesso';
import { MediaService } from '../../../media.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Pessoa } from '../../model/pessoa';
import { PessoasService } from '../../services/pessoas.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoas-form.component.html',
  styleUrl: './pessoas-form.component.scss'
})

export class PessoasFormComponent implements OnInit {

  form: UntypedFormGroup;
  selectedFile: File | null = null;
  assessorias: Assessoria[] = [];
  assessoriasPai: Assessoria[] = [];
  assessoriasFilhas: Assessoria[] = [];
  selectedAssessoria: any;

  @Output() add = new EventEmitter(false);

  url?: string;


  postos = PostoGraduacaoList;
  selectedPosto: PostoGraduacao;

  acessos = TipoAcessoList;
  selectedAcesso: TipoAcesso;





  upload(event: any) {

    const file: File = event.target.files[0];
    const identidade = this.form.get('identidade')?.value; // Captura o valor do campo identidade

    if (file && identidade) {
      // Renomeia o arquivo com o valor do campo identidade e extensão .jpg
      const renamedFile = new File([file], `${identidade}.jpg`, { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('file', renamedFile);

      this.mediaService.uploadFile(formData)
        .subscribe((response: any) => {
          console.log('response', response);
          this.url = response.url;
        });

    }
  }

  onAssessoriaChange(assessoriaPai: Assessoria): void {
    if (assessoriaPai && assessoriaPai._id) {
      this.assessoriasFilhas = this.assessorias.filter(a => a.assessoriaPai?._id === assessoriaPai._id);
      console.log(assessoriaPai)
      this.form.get('assessoriaFilha')?.reset(); // Limpa a seleção de assessoria filha ao mudar a assessoria pai
    } else {
      this.assessoriasFilhas = [];
      console.log(this.assessoriasFilhas)
    }
  }


  constructor(  private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private service: PessoasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    //public formUtils: FormUtilsService,
    private assessoriasService: AssessoriasService,
    private mediaService: MediaService

  ) {

      this.form = this.formBuilder.group({
        _id: [''],
        users: [''],
        identidade: ['',[Validators.required, Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{1}$')]],
        nomeGuerra: ['', Validators.required],
        nome: ['', Validators.required],
        postoGraduacao: ['', Validators.required],
        antiguidade:[''],
        tipoAcesso: ['', Validators.required],
        assessoria: [null, Validators.required],
        assessoriaFilha:[null],
        acesso: ['', Validators.required],
        ramal: ['', [Validators.required, Validators.pattern('^810 - \\d{4}$')]],
        caminho: ['', Validators.required]

      });

        this.selectedPosto = PostoGraduacao.GEN_EXERCITO;
        this.selectedAcesso = TipoAcesso.USUARIO;

        this.assessoriasService.list().subscribe((data: any[]) => {
        this.assessorias = data;
       });

       this.assessoriasService.listPai().subscribe((data: any[]) => {
        this.assessoriasPai = data;
       });

    }

    compareAssessoria(a1: Assessoria, a2: Assessoria): boolean {
      return a1 && a2 ? a1._id === a2._id : a1 === a2;
    }

  ngOnInit(): void {
    const pessoa: Pessoa = this.route.snapshot.data['pessoa'];
    this.form.setValue({
      _id: pessoa._id || '',
      identidade: pessoa.identidade || '',
      users: pessoa.users || '',
      nome: pessoa.nome || '',
      nomeGuerra: pessoa.nomeGuerra || '',
      postoGraduacao: pessoa.postoGraduacao || '',
      antiguidade: pessoa.antiguidade || '',
      tipoAcesso: pessoa.tipoAcesso || '',
      assessoria: pessoa.assessoria || null,
      assessoriaFilha: pessoa.assessoria || null,
      acesso: pessoa.acesso || '',
      ramal: pessoa.ramal || '',
      caminho: pessoa.caminho || ''


    });
    // Se quiser mostrar a foto imediatamente no formulário de edição:
  this.url = pessoa.caminho; // Assumindo que você tem uma variável de pré-visualização

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

  private onSuccess() {
    this.snackBar.open('Pessoa salva com successo!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao salvar pessoa.'
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
