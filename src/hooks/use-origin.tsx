import { useState, useEffect } from "react"

const useOrigin = () => {
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return "";
    }
    const origin = typeof window !== undefined && (window.location.origin || "");

    return origin;
}

export default useOrigin;
