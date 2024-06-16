import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {UserStateModel} from "../../models/user";
import {CreateUser, DeleteUser, EditUser, GetUserById} from "./user.actions";

@State<UserStateModel>({
    name: 'user',
    defaults: {
        id: 0,
        name: '',
        surname: '',
        email: '',
        contracts: []
    }
})

@Injectable()
export class UserState {
    @Selector()
    static user(state: UserStateModel) {
        return state
    }

    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

    @Action(GetUserById)
    getUserById({patchState}: StateContext<UserStateModel>, {payload}: GetUserById) {
        return this.httpClient.get<UserStateModel>(`http://localhost:8080/users/${payload}`).pipe(tap(response => {
            patchState({
                id: response.id,
                name: response.name,
                surname: response.surname,
                email: response.email,
                contracts: response.contracts
            })
        }))
    }

    @Action(EditUser)
    editUser({getState, dispatch}: StateContext<UserStateModel>, {payload}: EditUser) {
        const state = getState();
        return this.httpClient.patch<UserStateModel>(`http://localhost:8080/users/${state.id}`, {
            name: payload.name,
            surname: payload.surname,
            email: payload.email
        }).pipe(tap(response => {
            window.location.reload();
        }))
    }

    @Action(CreateUser)
    addUser({dispatch}: StateContext<UserStateModel>, {payload}: CreateUser) {
        return this.httpClient.post<UserStateModel>(`http://localhost:8080/users`, {
            name: payload.name,
            surname: payload.surname,
            email: payload.email
        }).pipe(tap(response => {
            this.router.navigate([`/users/${response.id}`]);
            }
        ));
    }

    @Action(DeleteUser)
    deleteUser({getState}:StateContext<UserStateModel>){
        const state = getState();
        return this.httpClient.delete(`http://localhost:8080/users/${state.id}`).pipe(tap(()=>{
            this.router.navigate(['/users']);
        }))
    }
}