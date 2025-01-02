import { useState, useEffect } from "react";

interface FetchError {
    status: number;
};

export const useFetch = <T>(
    fetchFunction: (id: string) => Promise<T>,
    id: string | undefined,
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<FetchError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            if (!id) {
                setError({ status: 404 });
                setLoading(false);
                return;
            }

            try {
                const result = await fetchFunction(id);
                setData(result);
            } catch (err) {
                if(err instanceof Response){
                    setError({status: err.status});
                }
                else {
                    setError({status: 500});
                }
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, fetchFunction]);

    return { data, loading, error };
};

