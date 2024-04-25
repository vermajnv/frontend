import { useCallback, useEffect, useRef, useState } from "react"

export const useHttpRequest = () =>
{
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const activeHttpRequests = useRef([]);
    const sendRequest = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        try {
            setIsLoading(true);
            const responseData = await fetch(url, {
                method, 
                body, 
                headers,
                signal : httpAbortController.signal
            });
            console.log(responseData);
            const response = await responseData.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqController => reqController !== httpAbortController)
            if(!responseData.ok)
            {
                throw new Error(response.message);
            }
            return response;
        }
        catch (err) 
        {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            console.log(activeHttpRequests);
            activeHttpRequests.current.forEach(abortController => abortController.abort())
        }
    }, []);
    
    return {
        isLoading, 
        error,
        sendRequest,
        clearError
    }
}
