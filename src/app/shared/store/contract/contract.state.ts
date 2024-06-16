import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {ContractStateModel} from "../../models/contract";
import {CreateContract, DeleteContract, Repayment} from "./contract.actions";

@State<ContractStateModel>({
    name:'contract',
    defaults:{
        id: 0,
        createdAt: new Date(),
        userId: 0,
        creditId: 0,
        repayment: 0,
        opened: false
    }
})
@Injectable()
export class ContractState{
    @Selector()
    static contract(state: ContractStateModel){
        return state;
    }
    constructor(private httpClient: HttpClient,
                private router: Router) {
    }
    @Action(CreateContract)
    createContract({patchState}: StateContext<ContractStateModel>, {userId, creditId}: CreateContract){
        let params = new HttpParams().set('userId', userId).set('creditId', creditId);
        return this.httpClient.post<ContractStateModel>(`http://localhost:8080/contracts`, {}, {params}).pipe(tap(response => {
            window.location.reload();
            }
        ));
    }
    @Action(DeleteContract)
    deleteContract(_context: StateContext<ContractStateModel>, {id}: DeleteContract){
        return this.httpClient.delete(`http://localhost:8080/contracts/${id}`).pipe(tap(()=>{
            window.location.reload();
        }))
    }
    @Action(Repayment)
    repayment(_context: StateContext<ContractStateModel>, {payment, id}: Repayment){
        let params = new HttpParams().set('payment', payment)
        return this.httpClient.patch(`http://localhost:8080/contracts/pay/${id}`, {}, {params}).pipe(tap(()=>{
            window.location.reload();
        }))
    }
}