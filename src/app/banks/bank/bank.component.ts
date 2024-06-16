import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationDialogComponent} from "../../shared/component/confirmation-dialog/confirmation-dialog.component";
import {
    CreateEditBankDialogComponent
} from "../../shared/component/create-edit-bank-dialog/create-edit-bank-dialog.component";
import {
    CreateEditCreditDialogComponent
} from "../../shared/component/create-edit-credit-dialog/create-edit-credit-dialog.component";
import {BankStateModel} from "../../shared/models/bank";
import {CreditStateModel} from "../../shared/models/credit";
import {BankService} from "../../shared/services/bank.service";
import {CreditService} from "../../shared/services/credit.service";

@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrl: './bank.component.scss'
})
export class BankComponent implements OnInit {
    bank: BankStateModel | undefined;
    destroyRef = inject(DestroyRef);
    dataSource = new MatTableDataSource<CreditStateModel>();
    displayedColumns: string[] = ['id', 'name', 'maxSum', 'commission', 'contractTerm'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private route: ActivatedRoute,
                protected bankService: BankService,
                protected creditService: CreditService,
                protected dialog: MatDialog) {
    }

    public ngOnInit(): void {
        this.bankService.getBankById(this.route.snapshot.params['id']);
        this.bankService.bank$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(bank => {
            this.bank = bank;
            this.creditService.credits$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(creditState => {
                if (creditState) {
                    this.dataSource = new MatTableDataSource<CreditStateModel>(creditState);
                } else {
                    this.dataSource.data = [];
                }
            })
        });
    }

    public deleteCredit(element: any): void {

    }

    public editContract(element: any): void {

    }

    public editBank(): void {
        if (this.bank) {
            const dialogRef = this.dialog.open(CreateEditBankDialogComponent, {
                width: '400px',
                closeOnNavigation: true,
                data: {
                    name: this.bank.name,
                    owner: this.bank.owner,
                    address: this.bank.owner,
                    website: this.bank.website,
                    id: this.bank.id,
                    maxLimit: this.bank.maxLimit,
                    isEdit: true
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.bankService.editBank(result);
                }
            });
        }
    }

    public deleteBank(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {autoFocus: false});
        dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
            if (result) {
                this.bankService.deleteBank(); // Implement deleteUser method in your service
            }
        });
    }

    public addCredit(): void {
        const dialogRef = this.dialog.open(CreateEditCreditDialogComponent, {
            width: '400px',
            closeOnNavigation: true,
            data: {
                name: '',
                maxSum: 0,
                commission: 0,
                contractTerm: 0,
                id: 0,
                isEdit: false,
                bankId: this.bank?.id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.creditService.createCredit(result, this.bank?.id? this.bank.id : 0);
            }
        });
    }

    public sortData(e: Sort): void {
        this.creditService.getAllCreditsFromBank(
            this.route.snapshot.params['id'],
            {
                size: this.paginator.pageSize,
                page: this.paginator.pageIndex,
                sort: e.active + ',' + e.direction,
            })
    }

    public handlePageEvent(e: PageEvent): void {
        this.creditService.getAllCreditsFromBank(
            this.route.snapshot.params['id'],
            {
                size: e.pageSize,
                page: e.pageIndex,
                sort: this.sort.active ? this.sort.active + ',' + this.sort.direction : '',
            })
    }
}
