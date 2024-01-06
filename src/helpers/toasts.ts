import { toast } from "react-toastify";

interface Message {
    message: string
}

const errorToast = (error: Message): void => {
    toast.error(error.message);
}

const successToast = (message: string): void => {
    toast.success(message);
}

const infoToast = (info: Message): void => {
    toast.info(info.message);
}

export { 
    errorToast,
    infoToast,
    successToast
};