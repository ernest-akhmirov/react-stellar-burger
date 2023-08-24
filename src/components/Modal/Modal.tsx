import {useEffect, FC, PropsWithChildren} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyle from "../Modal/Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("modal") as HTMLElement;

type TModalProps = {
    closeModal: () => void;
};
const Modal: FC<PropsWithChildren<TModalProps>> = ({closeModal, children}) => {

    useEffect(() => {
        const closeEsc = (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                evt.preventDefault();
                closeModal();
            }
        };

        document.addEventListener("keydown", closeEsc);
        return () => {
            document.removeEventListener("keydown", closeEsc);
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={`${modalStyle.modal} `}>
                <div className={modalStyle.main}>
                    <div className={modalStyle.header}>
                        <div className={`${modalStyle.icon} `}>
                            <CloseIcon type="primary" onClick={closeModal}/>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>,
        modalRoot
    );
}

export default Modal;
