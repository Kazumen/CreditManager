import {ContractStateModel} from "./contract";

export interface UserStateModel {
    id: number,
    name: string,
    surname: string,
    email: string,
    contracts: ContractStateModel[]
}