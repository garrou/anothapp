import { toast } from "react-toastify";

interface Error {
    message: string
}

const errorToast = (error: Error): void => {
    toast.error(error.message);
}

const successToast = (message: string): void => {
    toast.success(message);
}

export { 
    errorToast,
    successToast
};