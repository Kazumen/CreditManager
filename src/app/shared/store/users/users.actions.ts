import {PagePayload} from "../../models/page-payload";

export class GetAllUsers {
    static readonly type = '[users] get all';
    constructor(public payload: PagePayload) {
    }
}