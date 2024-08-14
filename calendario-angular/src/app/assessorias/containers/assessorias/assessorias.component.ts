import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Assessoria } from '../../model/assessoria';
import { AssessoriasService } from '../../services/assessorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from '../../../shared/components/error-dialog/confimation-dialog/confimation-dialog.component';


@Component({
  selector: 'app-assessorias',
  templateUrl: './assessorias.component.html',
  styleUrl: './assessorias.component.scss'
})
export class AssessoriasComponent implements OnInit {

  assessorias$!: Observable<Assessoria[]>;

  // pessoasService: PessoasService;

  constructor(
    private assessoriasService: AssessoriasService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute

  ){
    this.refresh();
  }

    refresh(){
    this.assessorias$ = this.assessoriasService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar assessorias');
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

  onEdit(assessoria: Assessoria) {
    this.router.navigate(['edit', assessoria._id], {relativeTo: this.route});
    this.refresh();
    }

    onRemove(assessoria: Assessoria) {

    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: 'Tem certeza quanto a remoção dessa assessoria?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result){
        this.assessoriasService.remove(assessoria._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Assessoria removida com sucesso!', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'

            });
          }
        );
      }
    });
  }

}
