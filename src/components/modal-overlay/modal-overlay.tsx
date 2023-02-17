import styleModalOverlay from "./modal-overlay.module.css";
import { FC } from "react";

const ModalOverlay: FC<{ onCloseModal: () => void }> = ({ onCloseModal }) => {
  return <div className={styleModalOverlay.overlay} onClick={onCloseModal} />;
};

export default ModalOverlay;
