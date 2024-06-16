import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationDialogComponent} from "../../shared/component/confirmation-dialog/confirmation-dialog.component";
import {
    CreateContractDialogComponent
} from "../../shared/component/create-contract-dialog/create-contract-dialog.component";
import {
    EditUserDialogComponent
} from "../../shared/component/create-edit-user-dialog/create-edit-user-dialog.component";
import {PayRepaymentDialogComponent} from "../../shared/component/pay-repayment-dialog/pay-repayment-dialog.component";
import {ContractStateModel} from "../../shared/models/contract";
import {UserStateModel} from "../../shared/models/user";
import {ContractService} from "../../shared/services/contract.service";
import {UserService} from "../../shared/services/user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {
    user: UserStateModel | undefined;
    destroyRef = inject(DestroyRef);
    dataSource = new MatTableDataSource<ContractStateModel>();
    displayedColumns: string[] = ['id', 'repayment', 'createdAt', 'opened', 'actions'];

    constructor(private route: ActivatedRoute,
                protected userService: UserService,
                protected contractService: ContractService,
                protected dialog: MatDialog) {
    }

    public ngOnInit(): void {
        this.userService.getUserById(this.route.snapshot.params['id']);
        this.userService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(usersState => {
            if (usersState) {
                this.user = usersState;
                this.dataSource = new MatTableDataSource<ContractStateModel>(usersState.contracts);  // Assuming usersState.users is of type UsersStateModel[]
            } else {
                this.dataSource.data = [];
            }
        })
    }

    public addContract(): void {
        const dialogRef = this.dialog.open(CreateContractDialogComponent, {
            width: '400px',
            data: { userId:this.user?.id}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.contractService.createContract(this.user?.id ? this.user.id : 0, result)
            }
        });
    }

    public deleteUser(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {autoFocus: false});
        dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
            if (result) {
                this.userService.deleteUser(); // Implement deleteUser method in your service
            }
        });

    }

    public editUser(): void {
        if (this.user) {
            const dialogRef = this.dialog.open(EditUserDialogComponent, {
                width: '400px',
                closeOnNavigation: true,
                data: {name: this.user.name, surname: this.user.surname, email: this.user.email, isEdit: true}
            })
        }
    }

    public deleteContract(id: number): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {autoFocus: false});

        dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
            if (result) {
                this.contractService.deleteContract(id); // Implement deleteUser method in your service
            }
        });
    }

    public payPartialCredit(id: number, repayment: number): void {
        const dialogRef = this.dialog.open(PayRepaymentDialogComponent, {
            width: '400px',
            data: { id: id, repayment: repayment }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
               this.contractService.repayment(result, id);
            }
        });
    }

    public closeCredit(element: any): void {

    }


    public ngOnDestroy(): void {
        this.dialog.closeAll()
    }
}
