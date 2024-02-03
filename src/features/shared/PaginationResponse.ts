export interface PaginationResponse<T> {
    items: T[],
    currentPage: number,
    pageSize: number,
    totalItems: number
}