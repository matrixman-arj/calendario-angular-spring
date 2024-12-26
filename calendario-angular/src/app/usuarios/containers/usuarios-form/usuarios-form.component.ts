import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { TipoAcesso, TipoAcessoList } from '../../../enums/TipoAcesso';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Usuario } from '../../model/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuarios-form.component.html',
    styleUrl: './usuarios-form.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatSelect, MatOption, MatRadioGroup, MatRadioButton, MatCardActions, MatButton]
})

export class UsuariosFormComponent implements OnInit {

  form: UntypedFormGroup;
  selectedFile: File | null = null;

  @Output() add = new EventEmitter(false);

  url?: string;

  tipoAcessos = TipoAcessoList;
  selectedAcesso: TipoAcesso;

  constructor(  private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    //public formUtils: FormUtilsService,


  ) {

      this.form = this.formBuilder.group({
        _id: [''],
        username: [''],
        password: ['',[Validators.required]],
        role: ['', Validators.required],
        liberado: ['', Validators.required],
      });


        this.selectedAcesso = TipoAcesso.USUARIO;
    }

  ngOnInit(): void {

    // this.route.params.subscribe((params) => {
    //   const userId = params['id'];

    //   // Carregar os dados do usuário
    //   this.usuariosService.loadById(userId).subscribe((usuario: Usuario) => {
    //     // Atualiza o formulário com os valores do usuário
    //     console.log('Usuário carregado:', usuario);
    //     this.form.patchValue({
    //       username: usuario.username,
    //       role: usuario.role.toString(), // Preenche o select com o valor salvo no banco
    //       liberado: usuario.liberado,
    //       // Adicione outros campos conforme necessário
    //     });
    //   });
    // });
    const usuario: Usuario = this.route.snapshot.data['usuario'];
    this.form.setValue({
      _id: usuario._id || '',
      username: usuario.username || '',
      password: usuario.password || '',
      role: usuario.role || '',
      liberado: usuario.liberado || '',

    });


  }

   onSubmit() {
    this.usuariosService.save(this.form.value)

    .subscribe(result => this.onSuccess(), error => this.onError());

    console.log('Usuário atualizado:', this.form.value);

}

  onAdd(){
    this.add.emit(true);
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Usuario salva com successo!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao salvar usuario.'
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
