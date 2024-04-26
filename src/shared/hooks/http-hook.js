import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpRequest = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);

        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            });

            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        const abortAllRequests = () => {
            activeHttpRequests.current.forEach(controller => controller.abort());
        };

        return abortAllRequests;
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    };
};