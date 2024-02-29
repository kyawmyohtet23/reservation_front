import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url, method = "GET") {
    const [data, setData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const source = axios.CancelToken.source();
            const options = { cancelToken: source.token };
            setLoading(true);

            try {
                let response;
                if (method === "GET") {
                    response = await axios.get(url, options);
                } else if (method === "POST" && postData) {

                    const token = localStorage.getItem("token");
                    response = await axios.post(url, postData, {
                        ...options,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                console.log(response.data);

                setData(response.data);
                setStatusCode(response.data.status);
                // if (response.data.token) {
                //     localStorage.setItem("token", response.data.token);
                // }

                // console.log(data);

                setError(null);
            } catch (error) {
                // console.log(error.response.data.message);
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        // const logout = async () => {
        //     try {
        //         await axios.post("/api/logout");

        //         localStorage.removeItem("token");

        //     } catch (error) {
        //         console.error("Logout failed:", error);
        //     }
        // };

        fetchData();

        return () => {
            // Cleanup function to cancel the request
            const source = axios.CancelToken.source();
            source.cancel("Request canceled by cleanup");
        };
    }, [url, method, postData]);



    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://127.0.0.1:8000/api/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Perform any additional actions after successful logout
        } catch (error) {
            // Handle error during logout
        }
    };

    return { setPostData, data, postData, loading, error, statusCode, logout };
}

export default useFetch;
