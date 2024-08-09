import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Pessoa } from '../../model/pessoa';
import { PessoasService } from '../../services/pessoas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent implements OnInit {

  pessoas$: Observable<Pessoa[]>;

  // pessoasService: PessoasService;

  constructor(
    private pessoasService: PessoasService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute

  ){

    this.pessoas$ = this.pessoasService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar pssoas');
        return of([])
      })
    );
  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty


  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(pessoa: Pessoa) {
    this.router.navigate(['edit', pessoa._id], {relativeTo: this.route});
    }

  onRemove(pessoa: Pessoa) {
    this.pessoasService.remove(pessoa._id).subscribe(
      () => {
        this.snackBar.open('Pessoa removida com sucesso!', 'X', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'

        });
      }
    );
  }


}
