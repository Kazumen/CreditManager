import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BankService} from "../../services/bank.service";

export interface DialogData {
  id: string;
  name: string;
  owner: string;
  address: string;
  website: string;
  maxLimit: number;
  isEdit: boolean;
}

@Component({
  selector: 'app-create-edit-bank-dialog',
  templateUrl: './create-edit-bank-dialog.component.html',
  styleUrl: './create-edit-bank-dialog.component.scss'
})
export class CreateEditBankDialogComponent {
  bankForm: FormGroup;
  public title: string = this.data.isEdit ? 'Редагувати банк' : 'Добавити новий банк';
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateEditBankDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.bankForm = this.formBuilder.group({
      name:[this.data.name, [Validators.required, Validators.minLength(3)]],
      owner:[this.data.owner, [Validators.required, Validators.minLength(3)]],
      address:[this.data.address, [Validators.required, Validators.minLength(3)]],
      website:[this.data.website, [Validators.required, Validators.minLength(3)]],
      maxLimit:[this.data.maxLimit, [Validators.required, Validators.min(0)]]
    });
  }
  onSubmit(): void{
    if (this.bankForm.valid){
      this.dialogRef.close(this.bankForm.value);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
