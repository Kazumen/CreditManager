import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStateModel } from '../../models/user';
import { BankService } from '../../services/bank.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-select-dialog',
  templateUrl: './user-select-dialog.component.html',
  styleUrls: ['./user-select-dialog.component.scss']
})
export class UserSelectDialogComponent implements OnInit {
  form: FormGroup;
  users: UserStateModel[] = []; // Replace with actual user data
  currentLimit: number =0;
  maxSum: number = 0;

  constructor(
      public dialogRef: MatDialogRef<UserSelectDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { bankId: number, maxSum: number, bankMaxLimit: number },
      private fb: FormBuilder,
      private userService: UserService,
      private bankService: BankService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers({ page: 0, size: 100 });
    this.maxSum = this.data.maxSum;
    this.userService.users$.subscribe(data => {
      this.users = data;
    });
    this.form.get('user')?.valueChanges.subscribe(userId => {
      if (userId) {
        this.bankService.getLimitForUserByBank(this.data.bankId, userId).pipe(
            catchError((err: HttpErrorResponse) => {
              this.currentLimit = this.data.bankMaxLimit;
              return of(null); // Return a new Observable
            })
        ).subscribe(data => {
          if (data) {
            this.currentLimit = data.currentLimit;
          }
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
