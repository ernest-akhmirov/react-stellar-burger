import overlayStyle from "./ModalOverlay.module.css";

export default function ModalOverlay({closeModal}) {
    return <div className={overlayStyle.overlay} onClick={closeModal}></div>;
}
