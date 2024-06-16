import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreditService} from "../../services/credit.service";

export interface DialogData {
  id: string;
  name: string;
  maxSum: number;
  commission: number;
  contractTerm: number;
  bankId: number;
  isEdit: boolean;
}

@Component({
  selector: 'app-create-edit-credit-dialog',
  templateUrl: './create-edit-credit-dialog.component.html',
  styleUrl: './create-edit-credit-dialog.component.scss'
})
export class CreateEditCreditDialogComponent {
  creditForm: FormGroup;
  public title: string = this.data.isEdit ? 'Редагувати кредит' : 'Добавити новий кредит';
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateEditCreditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private bankService: CreditService){
    this.creditForm=this.formBuilder.group({
      name:[this.data.name, [Validators.required, Validators.minLength(3)]],
      maxSum:[this.data.maxSum, [Validators.required, Validators.min(0)]],
      commission:[this.data.commission, [Validators.required, Validators.min(0)]],
      contractTerm:[this.data.contractTerm, [Validators.required,Validators.min(0)]]
    })
  }
  onSubmit(): void{
    if (this.creditForm.valid){
      this.dialogRef.close(this.creditForm.value);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
