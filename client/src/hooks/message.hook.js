import { useCallback } from 'react'

export const useMessage = () => {
    return useCallback(text => {
        console.log(window);
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}