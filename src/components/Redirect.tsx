import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../services/profileService";

export default function Redirect() {
    const navigate = useNavigate();

    useEffect(() => {
        checkIfLogged();
    }, []);

    const checkIfLogged = async () => {
        const resp = await profileService.checkUser();

        if (resp.status === 200) {
            navigate('/series', { replace: true });
        } 
    }

    return (
        <></>
    )
};