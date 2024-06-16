import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {BankStateModel} from "../../models/bank";
import {BanksStateModel} from "../../models/banks";
import {Page} from "../../models/page";
import {GetAllBanks} from "./banks.actions";

@State<BanksStateModel>({
    name: 'banks',
    defaults:{
        banks:[],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        pageSize: 5
    }
})
@Injectable()
export class BanksState{
    @Selector()
    static users(state: BanksStateModel): BankStateModel[] {
        return state.banks;
    }

    @Selector()
    static totalPages(state: BanksStateModel): number {
        return state.totalPages;
    }

    @Selector()
    static totalElements(state: BanksStateModel): number {
        return state.totalElements;
    }

    @Selector()
    static currentPage(state: BanksStateModel): number {
        return state.currentPage;
    }

    @Selector()
    static pageSize(state: BanksStateModel): number {
        return state.pageSize;
    }

    constructor(private httpClient: HttpClient) {
    }

    @Action(GetAllBanks)
    getAllBanks({patchState}:StateContext<BanksStateModel>, {payload}: GetAllBanks){
        let sort: string;
        payload.sort? sort = payload.sort: sort = 'id,asc';
        let params = new HttpParams().set('size', payload.size).set('page', payload.page).set('sort', sort);
        return this.httpClient.get<Page>('http://localhost:8080/banks', { params }).pipe(tap((response: Page) => {
            console.log(params);
            patchState({
                banks: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.number,
                pageSize: response.size
            });
        }));
    }
}