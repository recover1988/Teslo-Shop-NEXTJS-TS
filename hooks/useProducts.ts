import useSWR, { SWRConfiguration } from 'swr'
import { IProduct } from '../interfaces'

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())
// para ya no usar el fetcher de este lado es mejor ponerlo en un contexto en el _app


export const useProducts = (url: string, config: SWRConfiguration = {}) => {

    // const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, config)

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }
}