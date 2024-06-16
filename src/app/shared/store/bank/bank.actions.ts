import {CreateBankForm} from "../../models/create-bank";

export class AddBank {
    static readonly type = '[bank] add';

    constructor(public payload: CreateBankForm) {
    }
}

export class EditBank {
    static readonly type = '[bank] edit';

    constructor(public payload: CreateBankForm) {
    }
}

export class GetBankById {
    static readonly type = '[bank] get by id';

    constructor(public payload: string) {
    }
}

export class DeleteBank {
    static readonly type = '[bank] delete';
}

export class GetBankByName{
    static readonly type = '[bank] get by name';
    constructor(public name: string) {
    }
}