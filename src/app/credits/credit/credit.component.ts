import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationDialogComponent} from "../../shared/component/confirmation-dialog/confirmation-dialog.component";
import {
  CreateEditCreditDialogComponent
} from "../../shared/component/create-edit-credit-dialog/create-edit-credit-dialog.component";
import {UserSelectDialogComponent} from "../../shared/component/user-select-dialog/user-select-dialog.component";
import {BankStateModel} from "../../shared/models/bank";
import {CreditStateModel} from "../../shared/models/credit";
import {BankService} from "../../shared/services/bank.service";
import {ContractService} from "../../shared/services/contract.service";
import {CreditService} from "../../shared/services/credit.service";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss'
})
export class CreditComponent implements OnInit{
  credit: CreditStateModel | undefined;
  destroyRef = inject(DestroyRef);
  bank: BankStateModel | undefined
  constructor(private route: ActivatedRoute,
              protected bankService: BankService,
              protected creditService: CreditService,
              protected dialog: MatDialog,
              protected contractService: ContractService) {
  }

  public ngOnInit(): void {
    this.creditService.getCreditById(this.route.snapshot.params['id']).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(()=>{
      this.creditService.credit$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(credit=>{
        this.credit = credit;
        this.bankService.getBankByName(credit.bankName);
        this.bankService.bank$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data=>{
          this.bank = data;
        })
      })
    });
  }

  public editCredit(): void {
    if (this.credit){
      const dialogRef = this.dialog.open(CreateEditCreditDialogComponent, {
        width: '400px',
        closeOnNavigation: true,
        data: {
          name: this.credit.name,
          maxSum: this.credit.maxSum,
          commission: this.credit.commission,
          contractTerm: this.credit.contractTerm,
          id: this.credit.id,
          isEdit: true,
          bankId: this.bank?.id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.creditService.editCredit(result);
        }
      });
    }
  }

  public deleteCredit(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {autoFocus: false});
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.creditService.deleteCredit();
      }
    });
  }

  public takeCredit(): void {
    const dialogRef = this.dialog.open(UserSelectDialogComponent, {
      width: '300px',
      data: {bankId: this.bank?.id, maxSum: this.credit?.maxSum, bankMaxLimit: this.bank?.maxLimit}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contractService.createContract(result, this.credit?.id? this.credit.id : 0);
      }
    });
  }
}
