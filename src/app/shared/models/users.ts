import {UserStateModel} from "./user";

export interface UsersStateModel {
    users: UserStateModel[],
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
}