import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                console.log(body);
                
                body = JSON.stringify(body)
                console.log(body);
                headers['Content-Type'] = 'application/json'
            }            
            const response = await fetch(url, { method, body, headers })            
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message)
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            throw e
        }
    }, [])
    return { request, loading }
}