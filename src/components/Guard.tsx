import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../services/profileService";

export default function Guard() {
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const resp = await profileService.getUser();

        if (resp.status !== 200) {
            navigate('/', { replace: true });
        }
    }
    
    return (
        <></>
    );
};