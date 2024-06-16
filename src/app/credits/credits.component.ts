import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {CreditStateModel} from "../shared/models/credit";
import {CreditService} from "../shared/services/credit.service";

@Component({
    selector: 'app-credits',
    templateUrl: './credits.component.html',
    styleUrl: './credits.component.scss'
})
export class CreditsComponent implements OnInit {
    destroyRef = inject(DestroyRef);
    displayedColumns: string[] = ['id', 'name', 'maxSum', 'commission', 'contractTerm', 'bankName'];
    dataSource = new MatTableDataSource<CreditStateModel>();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private router: Router,
                protected dialog: MatDialog,
                protected creditService: CreditService) {
    }

    public ngOnInit(): void {
        this.creditService.getAllCredits({page: 0, size: 5});
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.creditService.credits$)
            this.creditService.credits$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(creditState => {
                if (creditState) {
                    this.dataSource = new MatTableDataSource<CreditStateModel>(creditState);
                }
            })
    }

    public handlePageEvent(e: PageEvent): void {
        this.getAllBanks()
    }

    public goToCredit(id: string): void {
        this.router.navigate(['/credits', id]);
    }

    public sortData(e: Sort): void {
        this.getAllBanks()
    }

    public getAllBanks() {
        this.creditService.getAllCredits({
            size: this.paginator.pageSize,
            page: this.paginator.pageIndex,
            sort: this.sort.active ? this.sort.active + ',' + this.sort.direction : ''
        })
    }

    public applyFilter($event: KeyboardEvent): void {

    }

    public openAddCreditDialog(): void {

    }
}
