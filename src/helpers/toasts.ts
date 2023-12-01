import { toast } from "react-toastify";

const errorToast = (message: string): void => {
    toast.error(message);
}

const successToast = (message: string): void => {
    toast.success(message);
}

const promiseToast = (prom: Promise<unknown>, pending: string, success: string, error: string) => {
    toast.promise(prom, { pending, success, error });
}

export { 
    errorToast,
    promiseToast,
    successToast
};