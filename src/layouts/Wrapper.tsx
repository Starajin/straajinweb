import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <>
        {children}
        <ToastContainer position="top-center" />
    </>;
}

export default Wrapper
