import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Auditorio } from '../../modelo/Auditorio';

import { AsyncPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { ResizeEvent } from 'angular-resizable-element';
import { Assessoria } from '../../../assessorias/model/assessoria';
import { AssessoriasService } from '../../../assessorias/services/assessorias.service';
import { ConfimationDialogComponent } from '../../../shared/components/error-dialog/confimation-dialog/confimation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { AuditorioPage } from '../../modelo/auditorio-page';
import { AuditoriosService } from '../../services/auditorios.service';
import { AuditoriosListaComponent } from "../../components/auditorios-lista/auditorios-lista.component";
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-auditorios',
    templateUrl: './auditorios.component.html',
    styleUrl: './auditorios.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, MatPaginator, MatProgressSpinner, MatDatepickerModule, AsyncPipe, MatFormFieldModule, MatInputModule, MatSelectModule, AuditoriosListaComponent]
})
export class AuditoriosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;
  length = 0;

  dataInicio: string | null | undefined = undefined;
  dataFim: string | null | undefined = undefined;

  termo = '';

  onResizeEnd(event: ResizeEvent): void {
    console.log('Resize event:', event);
  }

  auditorios$!: Observable<Auditorio[]>;
  auditorios2$!: Observable<AuditorioPage>;

  auditorios: Auditorio[] = [];

  auditoriosOriginais: Auditorio[] = [];

  assessorias: Assessoria[] = [];

  assessoriasOriginais: Assessoria[] = [];

  constructor(
    private readonly assessoriasService: AssessoriasService,
    private readonly fb: FormBuilder,
    private readonly auditoriosService: AuditoriosService,
    // private auditorioModalService: AuditorioModalService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute

  ){
    this.refresh2();

    this.assessoriasService.list().subscribe((data: Assessoria[]) => {
      this.assessorias = data;
     })
  }

  refresh(){
  this.auditorios$ = this.auditoriosService.list()
  .pipe(
    catchError(error => {
      this.onError('Erro ao carregar auditorios');
      return of([])
    })
  );
}

refresh2(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }, termo = '') {
  this.auditorios2$ = this.auditoriosService.list2(termo, pageEvent.pageIndex, pageEvent.pageSize).pipe(
    tap((page: AuditorioPage) => {
      // Atualize o estado local com os dados retornados
      this.auditorios = page.content; // ou page.auditorios dependendo do formato
      this.pageIndex = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;

      console.log('Auditorios carregados:', this.auditorios);
    }),
    catchError(error => {
      this.onError('Erro ao carregar auditorios');
      return of({ content: [], auditorios:[], totalElements: 0, totalPages: 0 });
    })
  );
}


// refresh2(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }, termo = '') {
//   this.auditorios2$ = this.auditoriosService.list2(termo, pageEvent.pageIndex, pageEvent.pageSize)
//   .pipe(
//     tap(() => {
//       this.pageIndex = pageEvent.pageIndex;
//       this.pageSize = pageEvent.pageSize;
//     }),
//     catchError(error => {
//       this.onError('Erro ao carregar auditorios');
//       return of({ auditorios: [], content: [], totalElements: 0, totalPages: 0 });
//     })
//   );
// }

refresh3(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }, termo = '') {
  const dataInicio = this.dataInicio ?? null;
  const dataFim = this.dataFim ?? null;
  this.auditorios2$ = this.auditoriosService.list3(dataInicio, dataFim, pageEvent.pageIndex, pageEvent.pageSize).pipe(
    tap((page: AuditorioPage) => {
      // Atualize o estado local com os dados retornados
      this.auditorios = page.content; // ou page.auditorios dependendo do formato
      this.pageIndex = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;

      console.log('Auditorios carregados:', this.auditorios);
    }),
    catchError(error => {
      this.onError('Erro ao carregar auditorios');
      return of({ content: [], auditorios:[], totalElements: 0, totalPages: 0 });
    })
  );
}

onSearchByDate(type: 'inicio' | 'fim', value: Date | null): void {
  if (type === 'inicio') {
    this.dataInicio = value ? value.toISOString().split('T')[0] : null; // Converte para 'yyyy-MM-dd'
  } else if (type === 'fim') {
    this.dataFim = value ? value.toISOString().split('T')[0] : null; // Converte para 'yyyy-MM-dd'
  }

  console.log('Datas atualizadas:', { dataInicio: this.dataInicio, dataFim: this.dataFim });

  // Se ambos os campos de data estão vazios, reseta para o estado inicial
  if (!this.dataInicio && !this.dataFim) {
    this.loadAllAuditorios(); // Carrega todos os auditorios
  } else {
    this.refresh3({ length: 0, pageIndex: 0, pageSize: this.pageSize });
  }
}

// Método para carregar todos os auditorios (estado inicial)
loadAllAuditorios(): void {
  this.auditoriosService.getAllAuditorios(this.pageSize, this.pageIndex).subscribe((response) => {
    this.auditorios = response.content;
    this.length = response.totalElements;
  });
}


     // Escutar mudanças no campo 'pessoa'
onAuditorioChange(auditorioId: string): void {
  // Encontre a pessoa selecionada a partir da lista de pessoas
  const selectedAuditorio = this.auditorios.find(auditorio => auditorio.id === Number(auditorioId));

  // Se a pessoa tiver uma assessoria associada, atualize o campo 'assessoria'
  if (selectedAuditorio && selectedAuditorio.assessoria) {
    // Add meaningful code here or remove the block if not needed
    console.log(`Selected pessoa has assessoria: ${selectedAuditorio.assessoria}`);
  }
}

onPageChange(event: PageEvent): void {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  // this.search(); // Recarrega os dados da nova página
}

onSearchByAssessoria(sigla: string): void {
  if (sigla === '') {
    // Se o usuário selecionar "Nenhum", restaura a tabela ao estado inicial.
    this.refresh2({ length: 0, pageIndex: 0, pageSize: this.pageSize }, '');
  } else {
    // Aplica o filtro para pesquisar auditorios pela assessoria selecionada.
    this.refresh2({ length: 0, pageIndex: 0, pageSize: this.pageSize }, sigla);
  }
}

  onSearchTermChange(value: string): void {
    if (value === '') {
      // Restaura a tabela ao estado inicial
      this.refresh2({ length: 0, pageIndex: 0, pageSize: this.pageSize }, '');
    } else {
      // Aplica o filtro
      this.refresh2({ length: 0, pageIndex: 0, pageSize: this.pageSize }, value);
    }
  }

  filterSelectDeAssessorias(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    // Verifica se o valor do input está vazio
    if (value.trim() === '') {
      // Restaura a lista original de pessoas
      this.assessorias = [...this.assessoriasOriginais];
    } else {
      // Filtra os itens com base no termo digitado
      this.assessorias = this.assessoriasOriginais.filter(assessoria =>
        assessoria.sigla.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  // filterSelectDeAssessorias(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const value = inputElement.value;

  //   // Verifica se o valor do input está vazio
  //   if (value.trim() === '') {
  //     // Restaura a lista original de pessoas
  //     this.auditorios = [...this.auditoriosOriginais];
  //   } else {
  //     // Filtra os itens com base no termo digitado
  //     this.auditorios = this.auditoriosOriginais.filter(auditorio =>
  //       auditorio.assessoria.sigla.toLowerCase().includes(value.toLowerCase())
  //     );
  //   }
  // }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.assessoriasService.list().subscribe((data: Assessoria[]) => {
      this.assessorias = data;
      this.assessoriasOriginais = [...data]; // Clona os dados originais
    });
  }

  onAdd(){
    // console.log('entrei')
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(auditorio: Auditorio): void {
    if (auditorio.id) {
      this.router.navigate(['edit', auditorio.id], { relativeTo: this.route });
    } else {
      console.error('ID do auditorio está indefinido:', auditorio);
    }
  }


    onRemove(auditorio: Auditorio) {

    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: 'Tem certeza quanto a remoção desse auditorio?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result){
        this.auditoriosService.remove(auditorio.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Auditorio removido com sucesso!', 'X', {
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

