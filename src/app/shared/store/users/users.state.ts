import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {Page} from "../../models/page";
import {UserStateModel} from "../../models/user";
import {UsersStateModel} from "../../models/users";
import {GetAllUsers} from "./users.actions";

@State<UsersStateModel>({
    name: 'users',
    defaults: {
        users: [],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        pageSize: 5
    }
})
@Injectable()
export class UsersState {
    @Selector()
    static users(state: UsersStateModel): UserStateModel[] {
        return state.users;
    }

    @Selector()
    static totalPages(state: UsersStateModel): number {
        return state.totalPages;
    }

    @Selector()
    static totalElements(state: UsersStateModel): number {
        return state.totalElements;
    }

    @Selector()
    static currentPage(state: UsersStateModel): number {
        return state.currentPage;
    }

    @Selector()
    static pageSize(state: UsersStateModel): number {
        return state.pageSize;
    }

    constructor(private httpClient: HttpClient) {
    }
    @Action(GetAllUsers)
    getAllUsers({ patchState }: StateContext<UsersStateModel>, { payload }: GetAllUsers) {
        let sort: string;
        payload.sort? sort = payload.sort: sort = 'id,asc';
        let params = new HttpParams().set('size', payload.size).set('page', payload.page).set('sort', sort);
        return this.httpClient.get<Page>('http://localhost:8080/users', { params }).pipe(tap((response: Page) => {
            console.log(params);
            patchState({
                users: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.number,
                pageSize: response.size
            });
        }));
    }
}