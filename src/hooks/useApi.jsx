import { useEffect, useState } from 'react'
import services from '../services/Api'

export const useApi = (path) => {

    const [state, setState] = useState({
        data: [],
        loading: false,
        error: ''
    })
    useEffect(() => { onLoad() }, [])

    const onLoad = async () => {
        try {
            setState({...state, loading: true})
            const resp = await services.get(path)
            if (resp.status !== 200) throw new Error("No se pudo establecer error")
            if (resp.data.length === 0) throw new Error("Sin informacion disponible")
            setState({...state, data: resp.data, loading: false})
        } catch (error) {
            setState({...state, error: error.message})
        }
    }

    return {...state, reload: onLoad }
}
