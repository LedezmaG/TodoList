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

    const onGet = async ({newPath}) => {
        try {
            setState({...state, loading: true})
            const resp = await services.get(newPath,
                {
                    'Access-Control-Allow-Origin': true
                })
            if (resp.status !== 200) throw new Error("No se pudo establecer error")
            if (resp.data.length === 0) throw new Error("Sin informacion disponible")
            return {data: resp.data, status: true}
        } catch (error) {
            setState({...state, error: error.message})
        }
    }

    const onPost = async ({ newPath, data }) => {
        try {
            setState({...state, loading: true})
            const resp = await services.post(
                newPath,
                {...data}
            )
            if (resp.status !== 201) throw new Error("No se pudo establecer error")
            if (resp.data.length === 0) throw new Error("Sin informacion disponible")
            setState({...state, data: resp.data, loading: false})
            return {data: resp.data, status: true}
        } catch (error) {
            setState({...state, error: error.message})
        }
    }

    const onUpdate = async ({newPath, data}) => {
        try {
            setState({...state, loading: true})
            const resp = await services.put(
                newPath,
                {...data}
            )
            console.log("🚀 ~ file: useApi.jsx:61 ~ onUpdate ~ resp:", resp)
            if (resp.status !== 200) throw new Error("No se pudo establecer error")
            setState({...state, data: resp.data, loading: false})
            return {data: resp.data, status: true}
        } catch (error) {
            console.log("🚀 ~ file: useApi.jsx:66 ~ onUpdate ~ error:", error)
            setState({...state, error: error.message})
        }
    }

    const onDelete = async ({newPath}) => {
        try {
            setState({...state, loading: true})
            const resp = await services.delete(newPath)
            if (resp.status !== 200) throw new Error("No se pudo establecer error")
            setState({...state, data: resp.data, loading: false})
            return {data: resp.data, status: true}
        } catch (error) {
            setState({...state, error: error.message})
        }
    }

    return {...state, onReload: onLoad, onGet, onPost, onUpdate, onDelete }
}
