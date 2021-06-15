import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogWindowService {
  dialogRef: MatDialogRef<any, any>;

  constructor(private dialog: MatDialog) { }

  openDialogWindow(dialogComponent: ComponentType<unknown>, dialogData: any, dataCallback: (data) => void ) {
    this.dialogRef = this.dialog.open(dialogComponent, { data: dialogData})
    this.dialogRef.afterClosed().subscribe(result => {
      dataCallback(result);
    })
  }
}