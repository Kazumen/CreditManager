import {PagePayload} from "../../models/page-payload";

export class GetAllBanks {
    static readonly type = '[banks] get all';

    constructor(public payload: PagePayload) {
    }
}