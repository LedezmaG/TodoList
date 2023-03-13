import { useEffect, useState } from 'react';
import services from '../services/Api';

export const useTasks = async ( path, url ) => {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => { 
        services.baseURL = url
    }, [url])

    useEffect(() => { getApi() }, [])
    
    const getApi = async () => {
        try {
            setLoading(!loading)
            const resp = await services.get(path)
            if (resp.status !== 200) throw new Error("Error de conexion")
    
            setData( resp.data )
            setLoading(!loading)
        } catch (error) {
            setError(error)
        }
    }

    return { data, loading, error }
}
