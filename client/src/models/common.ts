export interface ListResponse<T> {
    data: T[],
    totalPages: number,
    currentPage: number,
}