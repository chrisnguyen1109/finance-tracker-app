import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useFirebaseRealTime = collectionQuery => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);

        const unsub = onSnapshot(
            collectionQuery(),
            response => {
                setData([]);
                response.docs.forEach(doc => {
                    setData(prevState =>
                        prevState.concat({
                            ...doc.data(),
                            id: doc.id,
                        })
                    );
                });

                setLoading(false);
            },
            err => {
                console.log(err);
                setError(new Error('Could not fetch the data!'));
                setLoading(false);
            }
        );

        return () => unsub();
    }, []);

    return { loading, data, error };
};

export default useFirebaseRealTime;
