import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ReactDom from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styleModal from "./modal.module.css";
import { FC } from "react";
const modalContainer = document.querySelector("#popup") as HTMLElement;

type TModal = {
  onClose: () => void;
  children: JSX.Element;
};

const Modal: FC<TModal> = ({ onClose, children }) => {
  React.useEffect(() => {
    function closeEscModal(evt: KeyboardEvent) {
      if (evt.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeEscModal);

    return () => {
      document.removeEventListener("keydown", closeEscModal);
    };
  }, [onClose]);

  return ReactDom.createPortal(
    <div className={styleModal.modal}>
      <ModalOverlay onCloseModal={onClose} />
      <div className={`${styleModal.content} pr-10 pl-10`}>
        {children}
        <button className={styleModal.close} type="button" onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
