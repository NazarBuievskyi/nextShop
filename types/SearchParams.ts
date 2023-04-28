type Params = {
    id: string
}

type SearchParams = {
    id: string,
    name: string,
    unit_amount: number | null,
    image: string,
    description: string,
    features: string,
}

export type SearchParamsType = {
    params: Params,
    searchParams: SearchParams,
}

