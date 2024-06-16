import {Injectable} from "@angular/core";
import {Store} from "@ngxs/store";
import {CreateContract, DeleteContract, Repayment} from "../store/contract/contract.actions";

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    constructor(private readonly store: Store) {
    }

    public deleteContract(id: number): void {
        this.store.dispatch(new DeleteContract(id));
    }

    public createContract(userId: number, creditId: number): void {
        this.store.dispatch(new CreateContract(userId, creditId));
    }
    public repayment(payment: number, id: number){
        this.store.dispatch(new Repayment(payment, id));
    }
}