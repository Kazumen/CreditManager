import {CreditStateModel} from "./credit";

export interface CreditsStateModel {
    credits: CreditStateModel[],
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
}