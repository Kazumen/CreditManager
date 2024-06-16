import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {CreditStateModel} from "../../models/credit";
import {UserStateModel} from "../../models/user";
import {CreateCredit, DeleteCredit, EditCredit, GetCreditById} from "./credit.actions";

@State<CreditStateModel>({
    name:'credit',
    defaults:{
        id: 0,
        name: '',
        maxSum: 0,
        commission: 0,
        contractTerm: 0,
        bankName: ''
    }
})

@Injectable()
export class CreditState {
    @Selector()
    static credit(state: CreditStateModel){
        return state
    }
    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

    @Action(GetCreditById)
    getCreditById({patchState}: StateContext<CreditStateModel>, {id}: GetCreditById){
        return this.httpClient.get<CreditStateModel>(`http://localhost:8080/credits/${id}`).pipe(tap(response => {
            patchState({
                id: response.id,
                name: response.name,
                maxSum: response.maxSum,
                commission: response.commission,
                contractTerm: response.contractTerm,
                bankName: response.bankName
            })
        }))
    }
    @Action(EditCredit)
    editCredit({getState}: StateContext<CreditStateModel>, {payload}: EditCredit){
        const state = getState();
        return this.httpClient.patch<UserStateModel>(`http://localhost:8080/credits/${state.id}`, {
            name: payload.name,
            maxSum: payload.maxSum,
            commission: payload.commission,
            contractTerm: payload.contractTerm
        }).pipe(tap(response => {
            window.location.reload();
        }))
    }

    @Action(CreateCredit)
    createCredit({dispatch}: StateContext<CreditStateModel>, {payload,bankId}: CreateCredit){
        return this.httpClient.post<CreditStateModel>(`http://localhost:8080/credits`, {
            name: payload.name,
            maxSum: payload.maxSum,
            commission: payload.commission,
            contractTerm: payload.contractTerm,
            bankId: bankId
        }).pipe(tap(response => {
                this.router.navigate([`/credits/${response.id}`]);
            }
        ));
    }
    @Action(DeleteCredit)
    deleteCredit({getState}: StateContext<CreditStateModel>){
        const state = getState();
        return this.httpClient.delete(`http://localhost:8080/credits/${state.id}`).pipe(tap(()=>{
            this.router.navigate(['/credits']);
        }))
    }
}