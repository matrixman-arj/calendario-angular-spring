import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confimation-dialog',
  templateUrl: './confimation-dialog.component.html',
  styleUrl: './confimation-dialog.component.scss'
})
export class ConfimationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfimationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ){ }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
