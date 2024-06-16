import {Injectable} from "@angular/core";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {CreateUserForm} from "../models/create-user";
import {PagePayload} from "../models/page-payload";
import {UserStateModel} from "../models/user";
import {CreateUser, DeleteUser, EditUser, GetUserById} from "../store/user/user.actions";
import {GetAllUsers} from "../store/users/users.actions";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user$: Observable<UserStateModel> = this.store.select(state => state.user)

    public users$: Observable<UserStateModel[]> = this.store.select(state => state.users.users);

    public currentPage$: Observable<number> = this.store.select(state => state.users.currentPage);

    public totalPages$: Observable<number> = this.store.select(state => state.users.totalPages);

    public totalElements$: Observable<number> = this.store.select(state => state.users.totalElements);

    public pageSize$: Observable<number> = this.store.select(state => state.users.pageSize);

    constructor(private readonly store: Store) {
    }

    getAllUsers(payload: PagePayload) {
        this.store.dispatch(new GetAllUsers(payload));
    }

    getUserById(payload: string) {
        this.store.dispatch(new GetUserById(payload));
    }

    public deleteUser(): void {
        this.store.dispatch(new DeleteUser());

    }

    public editUser(payload: CreateUserForm): Observable<void> {
        return this.store.dispatch(new EditUser(payload));
    }

    public addUser(payload: CreateUserForm): Observable<void> {
        return this.store.dispatch(new CreateUser(payload));
    }
}