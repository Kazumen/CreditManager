export interface Limit{
    id: number,
    createdAt: Date,
    userId: number,
    bankId: number,
    maxLimit: number,
    currentLimit: number
}