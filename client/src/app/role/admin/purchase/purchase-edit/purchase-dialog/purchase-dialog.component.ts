import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  action: string;
  editMode: Boolean;
}

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }

  onSaveClick(): void {
    this.data.action = 'save';
    this.dialogRef.close(this.data);
  }

  onProfileClick(): void {
    this.data.action = 'profile';
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
  }

}
