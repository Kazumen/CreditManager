import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {BankStateModel} from "../../models/bank";
import {GetAllCreditsFromBank} from "../credits/credits.actions";
import {AddBank, DeleteBank, EditBank, GetBankById, GetBankByName} from "./bank.actions";


@State<BankStateModel>({
    name: 'bank',
    defaults: {
        id: 0,
        name: '',
        owner: '',
        address: '',
        website: '',
        maxLimit: 0.0
    }
})
@Injectable()
export class BankState {
    @Selector()
    static bank(state: BankStateModel) {
        return state
    }

    constructor(private httpClient: HttpClient,
                private router: Router,) {
    }

    @Action(GetBankById)
    getBankById({patchState, dispatch}: StateContext<BankStateModel>, {payload}: GetBankById) {
        return this.httpClient.get<BankStateModel>(`http://localhost:8080/banks/${payload}`).pipe(tap(response => {
            patchState({
                id: response.id,
                name: response.name,
                owner: response.owner,
                address: response.address,
                website: response.website,
                maxLimit: response.maxLimit
            })
            dispatch(new GetAllCreditsFromBank(response.id.toString(), {size: 5, page: 0}));
        }))
    }

    @Action(EditBank)
    editBank({getState, dispatch}: StateContext<BankStateModel>, {payload}: EditBank) {
        const state = getState();
        return this.httpClient.patch<BankStateModel>(`http://localhost:8080/banks/${state.id}`, {
            name: payload.name,
            owner: payload.owner,
            address: payload.address,
            website: payload.website,
            maxLimit: payload.maxLimit
        }).pipe(tap(() => {
            window.location.reload();
        }))
    }

    @Action(AddBank)
    addBank({dispatch}: StateContext<BankStateModel>, {payload}: AddBank) {
        return this.httpClient.post<BankStateModel>(`http://localhost:8080/banks`, {
            name: payload.name,
            owner: payload.owner,
            address: payload.address,
            website: payload.website,
            maxLimit: payload.maxLimit
        }).pipe(tap(response => {
            this.router.navigate([`/banks/${response.id}`]);
        }))
    }

    @Action(DeleteBank)
    deleteBank({getState}: StateContext<BankStateModel>) {
        const state = getState();
        return this.httpClient.delete(`http://localhost:8080/banks/${state.id}`).pipe(tap(() => {
            this.router.navigate(['/banks']);
        }))
    }

    @Action(GetBankByName)
    getBankByName({patchState}: StateContext<BankStateModel>, {name}: GetBankByName) {
        return this.httpClient.get<BankStateModel>(`http://localhost:8080/banks/name/${name}`).pipe(tap(response => {
            patchState({
                id: response.id,
                name: response.name,
                owner: response.owner,
                address: response.address,
                website: response.website,
                maxLimit: response.maxLimit
            })
        }))
    }
}