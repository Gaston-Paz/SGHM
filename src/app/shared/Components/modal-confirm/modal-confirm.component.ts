import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  message:string = "";
  confirm:string = "";
  cancel:string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private _dialogRef: MatDialogRef<ModalConfirmComponent>) { }

  ngOnInit(): void {
    this.message = this.data.message;
    this.confirm = this.data.buttonText.ok;
    this.cancel = this.data.buttonText.cancel;
  }


}
