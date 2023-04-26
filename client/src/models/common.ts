export interface ListResponse<T> {
    data: T[],
    // totalPages: number,
    // currentPage: number,
}

export interface ListParams{
    _sort?: string,
    _order?: number
}