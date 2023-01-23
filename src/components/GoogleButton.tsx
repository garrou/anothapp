import { Button, Image } from "react-bootstrap";

export default function GoogleButton() {
    const onClick = async () => {
        window.open(`${process.env.REACT_APP_SERVER}/auth/google`, '_self');
    }

    return (
        <Button variant='light' onClick={onClick}>
            <Image src='images/google.png' alt='Google' width='25' height='25' />
            &nbsp;Se connecter avec Google
        </Button>
    );
};