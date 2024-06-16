import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Router} from "@angular/router";
import {EditUserDialogComponent} from "../shared/component/create-edit-user-dialog/create-edit-user-dialog.component";
import {UserStateModel} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    destroyRef = inject(DestroyRef);
    displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'contracts'];
    dataSource = new MatTableDataSource<UserStateModel>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(public userService: UserService,
                private router: Router,
                protected dialog: MatDialog) {
    }

    ngOnInit() {
        this.userService.getAllUsers({page: 0, size: 5});
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.userService.users$)
            this.userService.users$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(usersState => {
                if (usersState) {
                    this.dataSource = new MatTableDataSource<UserStateModel>(usersState);  // Assuming usersState.users is of type UsersStateModel[]
                } else {
                    this.dataSource.data = [];
                }
            })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    public handlePageEvent(e: PageEvent): void {
        this.getAllUsers()
    }

    public goToUser(id: string): void {
        this.router.navigate(['/users', id]);
    }

    public sortData(e: Sort): void {
        this.getAllUsers()
    }

    public openAddUserDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            width: '400px',
            closeOnNavigation: true,
            data: {name: '', surname: '', email: '', isEdit: false}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.addUser(result);
            }
        });
    }

    public getAllUsers() {
        this.userService.getAllUsers(
            {
                size: this.paginator.pageSize,
                page: this.paginator.pageIndex,
                sort: this.sort.active ? this.sort.active + ',' + this.sort.direction : '',
            })
    }
}
