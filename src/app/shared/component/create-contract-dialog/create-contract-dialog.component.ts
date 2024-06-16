import {HttpErrorResponse} from "@angular/common/http";
import {Component, DestroyRef, inject, Inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {of} from "rxjs";
import {catchError} from "rxjs/operators";
import {BankStateModel} from "../../models/bank";
import {CreditStateModel} from "../../models/credit";
import {BankService} from "../../services/bank.service";
import {CreditService} from "../../services/credit.service";

@Component({
    selector: 'app-create-contract-dialog',
    templateUrl: './create-contract-dialog.component.html',
    styleUrl: './create-contract-dialog.component.scss'
})
export class CreateContractDialogComponent implements OnInit {
    destroyRef = inject(DestroyRef);
    form: FormGroup;
    banks: BankStateModel[] = [];
    credits: CreditStateModel[] = [];
    currentLimit: number = 0;
    maxSum: number = 0;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateContractDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { userId: number },
        private bankService: BankService,
        private creditService: CreditService
    ) {
        this.form = this.fb.group({
            bank: ['', Validators.required],
            credit: [{value: '', disabled: true}, Validators.required]
        });
    }

    ngOnInit(): void {
        this.bankService.getAllBanks({page: 0, size: 100});
        this.bankService.banks$.subscribe(data => {
            this.banks = data;
        })

        this.form.get('bank')?.valueChanges.subscribe(bankId => {
            if (bankId) {
                this.bankService.getLimitForUserByBank(bankId, this.data['userId']).pipe(takeUntilDestroyed(this.destroyRef), catchError((err: HttpErrorResponse) => {
                    this.bankService.bank$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
                        this.currentLimit = data.maxLimit;
                    })
                    return of(null); // Return a new Observable
                })).subscribe(data => {
                    if (data)
                        this.currentLimit = data.currentLimit;
                })
                this.bankService.getBankById(bankId)

                console.log(this.currentLimit);
                this.creditService.getAllCreditsFromBank(bankId, {page: 0, size: 100});
                this.creditService.credits$.subscribe(data => {
                    this.credits = data;
                })
                this.form.get('credit')?.enable();
            }
        });
        this.form.get('credit')?.valueChanges.subscribe(creditId => {
            if (creditId) {
                this.creditService.getCreditById(creditId);
                this.creditService.credit$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
                    this.maxSum = data.maxSum;
                })
            }
        })
    }

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.get('credit')?.value);
        }
    }

    close() {
        this.dialogRef.close();
    }


}
