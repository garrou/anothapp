import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Guard() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/auth/me`, {
                credentials: 'include'
            });

            if (res.status !== 200) {
                navigate('/', { replace: true });
            }
        })();
    }, []);
    
    return (
        <></>
    );
};