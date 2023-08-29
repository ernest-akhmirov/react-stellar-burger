import overlayStyle from "./ModalOverlay.module.css";

type TModalOverlayProps = {
    closeModal: () => void;
};
export default function ModalOverlay({closeModal}: TModalOverlayProps) {
    return <div className={overlayStyle.overlay} onClick={closeModal}></div>;
}
