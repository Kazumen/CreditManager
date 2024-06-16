import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {
  CreateEditBankDialogComponent
} from "../shared/component/create-edit-bank-dialog/create-edit-bank-dialog.component";
import {BankStateModel} from "../shared/models/bank";
import {BankService} from "../shared/services/bank.service";

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.scss'
})
export class BanksComponent implements OnInit{
  destroyRef = inject(DestroyRef);
  displayedColumns: string[] = ['id', 'name', 'owner', 'address', 'website', 'maxLimit'];
  dataSource = new MatTableDataSource<BankStateModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router:Router,
              protected dialog:MatDialog,
              protected bankService: BankService) {
  }

  public ngOnInit(): void {
    this.bankService.getAllBanks({page: 0, size: 5});
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.bankService.banks$)
      this.bankService.banks$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(bankState => {
        if (bankState) {
          this.dataSource = new MatTableDataSource<BankStateModel>(bankState);
        } else {
          this.dataSource.data = [];
        }
      })
  }

  public handlePageEvent(e: PageEvent): void {
    this.bankService.getAllBanks(
        {
          size: e.pageSize,
          page: e.pageIndex,
          sort: this.sort.active ? this.sort.active + ',' + this.sort.direction : '',
        })
  }

  public goToBank(id: string): void {
    this.router.navigate(['/banks', id]);
  }

  public sortData(e: Sort): void {
    this.bankService.getAllBanks(
        {
          size: this.paginator.pageSize,
          page: this.paginator.pageIndex,
          sort: e.active + ',' + e.direction,
        })
  }

  public openAddBankDialog(): void {
    const dialogRef = this.dialog.open(CreateEditBankDialogComponent, {
      width: '400px',
      closeOnNavigation: true,
      data: {name: '', owner: '', address: '', website:'', maxLimit: 0.0,isEdit: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bankService.addBank(result);
      }
    });
  }

  public applyFilter($event: KeyboardEvent): void {

  }


}
