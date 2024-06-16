import {CreateUserForm} from "../../models/create-user";

export class GetUserById {
    static readonly type = '[user] get by id';

    constructor(public payload: string) {
    }
}

export class EditUser {
    static readonly type = '[user] edit';

    constructor(public payload: CreateUserForm) {
    }
}

export class CreateUser {
    static readonly type = '[user] create';

    constructor(public payload: CreateUserForm) {
    }
}

export class DeleteUser{
    static readonly type = '[user] delete';
}