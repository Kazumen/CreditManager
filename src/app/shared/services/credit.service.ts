import {Injectable} from "@angular/core";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {CreateCreditForm} from "../models/create-credit";
import {CreditStateModel} from "../models/credit";
import {PagePayload} from "../models/page-payload";
import {CreateCredit, DeleteCredit, EditCredit, GetCreditById} from "../store/credit/credit.actions";
import {GetAllCredits, GetAllCreditsFromBank} from "../store/credits/credits.actions";

@Injectable({
    providedIn: 'root'
})
export class CreditService{
    public credit$: Observable<CreditStateModel> = this.store.select(state => state.credit)

    public credits$: Observable<CreditStateModel[]> = this.store.select(state => state.credits.credits);

    public currentPage$: Observable<number> = this.store.select(state => state.credits.currentPage);

    public totalPages$: Observable<number> = this.store.select(state => state.credits.totalPages);

    public totalElements$: Observable<number> = this.store.select(state => state.credits.totalElements);

    public pageSize$: Observable<number> = this.store.select(state => state.credits.pageSize);

    constructor(private readonly store: Store) {
    }
    public getAllCreditsFromBank(id: number, pagePayload: PagePayload){
        this.store.dispatch(new GetAllCreditsFromBank(id.toString(), pagePayload));
    }

    public getAllCredits(pagePayload: PagePayload ): void {
        this.store.dispatch(new GetAllCredits(pagePayload));
    }

    public editCredit(payload: CreateCreditForm): void {
        this.store.dispatch(new EditCredit(payload));
    }

    public deleteCredit(): void {
        this.store.dispatch(new DeleteCredit());
    }

    public getCreditById(id: number): Observable<void> {
        return this.store.dispatch(new GetCreditById(id.toString()));
    }
    public createCredit(payload: CreateCreditForm, bankId: number): void{
        this.store.dispatch(new CreateCredit(payload, bankId));
    }
}