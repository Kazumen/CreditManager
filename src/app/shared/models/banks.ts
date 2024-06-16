import {BankStateModel} from "./bank";

export interface BanksStateModel {
    banks: BankStateModel[],
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
}