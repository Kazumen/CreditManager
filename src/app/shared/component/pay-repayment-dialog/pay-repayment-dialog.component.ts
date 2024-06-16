import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pay-repayment-dialog',
  templateUrl: './pay-repayment-dialog.component.html',
  styleUrl: './pay-repayment-dialog.component.scss'
})
export class PayRepaymentDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<PayRepaymentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01), Validators.max(data['repayment'])]]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.get('amount')?.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
