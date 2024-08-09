import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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

  @Output() add = new EventEmitter(false);

  url?: string;


  postos = PostoGraduacaoList;
  selectedPosto: PostoGraduacao;

  acessos = TipoAcessoList;
  selectedAcesso: TipoAcesso;

  assessorias: any[] = [];
  selectedAssessoria: any;



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
        _id: [null],
        users: [null],
        identidade: [''],
        nomeGuerra: [null],
        nome: [null],
        postoGraduacao: [null],
        tipoAcesso: [null],
        assessoria: [null],
        liberado: [null],
        ramal: [null],
        caminho: [null],


      });

        this.selectedPosto = PostoGraduacao.GEN_EXERCITO;
        this.selectedAcesso = TipoAcesso.USUARIO;

        this.assessoriasService.list().subscribe((data: any[]) => {
        this.assessorias = data;
       });



    }

    compareAssessoria(a1: Assessoria, a2: Assessoria): boolean {
      return a1 && a2 ? a1._id === a2._id : a1 === a2;
    }


  ngOnInit(): void {
    const pessoa: Pessoa = this.route.snapshot.data['pessoa'];
    this.form.setValue({
      _id: pessoa._id,
      identidade: pessoa.identidade,
      users: pessoa.users,
      nome: pessoa.nome,
      nomeGuerra: pessoa.nomeGuerra,
      postoGraduacao: pessoa.postoGraduacao,
      antiguidada: pessoa.antiguidade,
      tipoAcesso: pessoa.tipoAcesso,
      assessoria: pessoa.assessoria,
      liberado: pessoa.liberado,
      ramal: pessoa.ramal,
      caminho: pessoa.caminho


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

  // getErrorMessage(fieldName: string): string {
  //   return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  // }

}
