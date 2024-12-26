import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../../usuarios/containers/change-password/change-password.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class CustomSidenavComponent {



  menuItems = signal<MenuItem[]> ([

    ]);

    constructor(

      private router: Router,
      private dialog: MatDialog

){}


    navigateTo(path: string): void {
      this.router.navigate([`/${path}`]);
    }

    openChangePasswordDialog(): void {
      const dialogRef = this.dialog.open(ChangePasswordComponent);
        // width: '400px',
        // disableClose: true,

      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialog result: ', result);
      });
    }

}
