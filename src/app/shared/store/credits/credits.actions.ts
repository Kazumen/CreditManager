import {PagePayload} from "../../models/page-payload";

export class GetAllCreditsFromBank {
    static readonly type = '[credits] get all from bank';

    constructor(public id: string, public pageSettings: PagePayload) {
    }
}

export class GetAllCredits {
    static readonly type = '[credits] get all';

    constructor(public payload: PagePayload) {
    }
}