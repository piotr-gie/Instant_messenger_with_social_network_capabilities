import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogWindowService {

  constructor(private dialog: MatDialog) { }

  openDialogWindow(dialogComponent: ComponentType<unknown>, dialogData: any, dataCallback: (data) => void ) {
    let dialogRef =  this.dialog.open(dialogComponent, { data: dialogData})
    dialogRef.afterClosed().subscribe(result => {
      dataCallback(result);
    })
  }
}
