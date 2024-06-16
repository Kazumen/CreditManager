import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {CreditStateModel} from "../../models/credit";
import {CreditsStateModel} from "../../models/credits";
import {Page} from "../../models/page";
import {GetAllCredits, GetAllCreditsFromBank} from "./credits.actions";


@State<CreditsStateModel>({
    name: 'credits',
    defaults: {
        credits: [],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        pageSize: 5
    }
})
@Injectable()
export class CreditsState {
    @Selector()
    static credits(state: CreditsStateModel): CreditStateModel[] {
        return state.credits;
    }

    @Selector()
    static totalPages(state: CreditsStateModel): number {
        return state.totalPages;
    }

    @Selector()
    static totalElements(state: CreditsStateModel): number {
        return state.totalElements;
    }

    @Selector()
    static currentPage(state: CreditsStateModel): number {
        return state.currentPage;
    }

    @Selector()
    static pageSize(state: CreditsStateModel): number {
        return state.pageSize;
    }

    constructor(private httpClient: HttpClient) {
    }

    @Action(GetAllCreditsFromBank)
    getAllCreditsFromBank({patchState}: StateContext<CreditsStateModel>, {id, pageSettings}: GetAllCreditsFromBank) {
        let sort: string;
        pageSettings.sort ? sort = pageSettings.sort : sort = 'id,asc';
        let params = new HttpParams().set('size', pageSettings.size).set('page', pageSettings.page).set('sort', sort);
        return this.httpClient.get<Page>(`http://localhost:8080/credits/bank/${id}`, {params}).pipe(tap((response: Page) => {
            patchState({
                credits: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.number,
                pageSize: response.size
            });
        }));
    }

    @Action(GetAllCredits)
    getAllCredits({patchState}: StateContext<CreditsStateModel>, {payload}: GetAllCredits){
        let sort: string;
        payload.sort ? sort = payload.sort : sort = 'id,asc';
        let params = new HttpParams().set('size', payload.size).set('page', payload.page).set('sort', sort);
        return this.httpClient.get<Page>(`http://localhost:8080/credits`, {params}).pipe(tap((response: Page) => {
            patchState({
                credits: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.number,
                pageSize: response.size
            });
        }));
    }
}