import {CreateCreditForm} from "../../models/create-credit";

export class EditCredit {
    static readonly type = '[credit] edit';

    constructor(public payload: CreateCreditForm) {
    }
}

export class CreateCredit {
    static readonly type = '[credit] create';

    constructor(public payload: CreateCreditForm, public bankId: number) {
    }
}

export class GetCreditById {
    static readonly type = '[credit] get by id';

    constructor(public id: string) {
    }
}

export class DeleteCredit{
    static readonly type = '[credit] delete';
}