export class CreateContract {
    static readonly type = '[contract] create';

    constructor(public userId: number, public creditId: number) {
    }
}

export class DeleteContract {
    static readonly type = '[contract] delete';
    constructor(public id: number) {
    }
}
export class Repayment{
    static readonly type = '[contract] repay';
    constructor(public payment: number, public id: number) {
    }
}