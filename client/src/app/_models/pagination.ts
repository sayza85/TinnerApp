
export interface UserQueryPagination extends QueryPagination {
    username?:string
    min_age?:number
    max_age?:number
    looking_for?:string
    gender?:string
}
export interface QueryPagination {
    pageSize?: number,
    currentPage?: number,
    length?: number,
}

export interface Paginator<T, U> {
    pagination: T,
    items: U[]
}
export const default_pageSizeOptions = [2,5,10,25,35,100]
export const default_paginator = {
    pagination: {
        pageSize: 5,
        currentPage: 1,
        length: 0
    },
    items: []
}
