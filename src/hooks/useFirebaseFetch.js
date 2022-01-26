import { useEffect, useState } from 'react';

const useFirebaseFetch = () => {
    const [isAborted, setIsAborted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const resetState = () => {
        setLoading(true);
        setStatus('pending');
        setError(null);
    };

    const fetchData = async (queryFirebase, callback) => {
        resetState();
        try {
            const response = await queryFirebase;

            if (callback instanceof Function) {
                callback(response);
            }

            if (!isAborted) setStatus('success');
        } catch (err) {
            console.log(err);

            if (!isAborted) {
                setError(err);
                setStatus('error');
            }
        } finally {
            if (!isAborted) setLoading(false);
        }
    };

    useEffect(() => {
        return () => setIsAborted(true);
    }, []);

    return { loading, status, error, fetchData, setError };
};

export default useFirebaseFetch;
