import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PessoasService } from '../../services/pessoas.service';

@Component({
  selector: 'app-pessoa-detalhes-modal',
  templateUrl: './pessoa-detalhes-modal.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule, // <- Importando o módulo do campo de formulário
    MatInputModule, // <- Importando o módulo do input
  ],
  styleUrl: './pessoa-detalhes-modal.component.scss',
})
export class PessoaDetalhesModalComponent {
  isEditing: boolean = false;
  pessoaEditada: any;
  isSaving: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PessoaDetalhesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pessoasService: PessoasService
  ) {
    this.pessoaEditada = { ...data }; // Cópia dos dados originais para edição
  }

  ngOnInit() {
    this.pessoasService.getPessoaTIInfo(this.pessoaEditada._id).subscribe(
      (data) => {
        this.pessoaEditada.controleAcessoId = data?.controleAcessoId || '';
        this.pessoaEditada.contaAd = data?.contaAd || '';
        this.pessoaEditada.contaSiscau = data?.contaSiscau || '';
        this.pessoaEditada.contaSped = data?.contaSped || '';
      },
      (error) => {
        console.error("Erro ao carregar informações de TI:", error);
      }
    );
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isSaving = true;
  
    const tiInfo = {
      controleAcessoId: this.pessoaEditada.controleAcessoId,
      contaAd: this.pessoaEditada.contaAd,
      contaSiscau: this.pessoaEditada.contaSiscau,
      contaSped: this.pessoaEditada.contaSped
    };
  
    this.pessoasService.updatePessoaTIInfo(this.pessoaEditada._id, tiInfo).subscribe(
      (response) => {
        console.log("Informações de TI atualizadas com sucesso:", response);
        this.dialogRef.close(this.pessoaEditada);
      },
      (error) => {
        console.error("Erro ao atualizar informações de TI:", error);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
