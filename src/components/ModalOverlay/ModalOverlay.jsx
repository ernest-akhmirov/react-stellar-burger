import overlayStyle from "./ModalOverlay.module.css";

export default function ModalOverlay({closeModal}) {
    function clickOverlay() {
        closeModal();
    }

    return <div className={overlayStyle.overlay} onClick={clickOverlay}></div>;
}
