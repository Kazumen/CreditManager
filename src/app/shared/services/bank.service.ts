import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {BankStateModel} from "../models/bank";
import {CreateBankForm} from "../models/create-bank";
import {Limit} from "../models/limit";
import {PagePayload} from "../models/page-payload";
import {AddBank, DeleteBank, EditBank, GetBankById, GetBankByName} from "../store/bank/bank.actions";
import {GetAllBanks} from "../store/banks/banks.actions";

@Injectable({
    providedIn: 'root'
})
export class BankService{
    public bank$: Observable<BankStateModel> = this.store.select(state => state.bank)

    public banks$: Observable<BankStateModel[]> = this.store.select(state => state.banks.banks);

    public currentPage$: Observable<number> = this.store.select(state => state.banks.currentPage);

    public totalPages$: Observable<number> = this.store.select(state => state.banks.totalPages);

    public totalElements$: Observable<number> = this.store.select(state => state.banks.totalElements);

    public pageSize$: Observable<number> = this.store.select(state => state.banks.pageSize);


    constructor(private readonly store: Store,
                private httpClient: HttpClient) {
    }

    public getAllBanks(payload: PagePayload): void {
        this.store.dispatch(new GetAllBanks(payload));
    }

    public addBank(result: CreateBankForm): void {
        this.store.dispatch(new AddBank(result));
    }

    public editBank(result: CreateBankForm){
        this.store.dispatch(new EditBank(result));
    }

    public getBankById(id: string): void {
        this.store.dispatch(new GetBankById(id));
    }

    public deleteBank(): void {
        this.store.dispatch(new DeleteBank());
    }
    public getBankByName(name: string){
        this.store.dispatch(new GetBankByName(name));
    }

    public getLimitForUserByBank(bankId: number, userId: number): Observable<Limit> {
        const params = new HttpParams().set('userId', userId).set('bankId', bankId);
        return this.httpClient.get<Limit>('http://localhost:8080/limits/userbank', {params})
    }
}