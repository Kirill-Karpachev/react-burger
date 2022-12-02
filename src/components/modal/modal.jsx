import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ReactDom from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import styleModal from "./modal.module.css";
const modalContainer = document.querySelector("#popup");

function Modal({ onClose, children }) {
  React.useEffect(() => {
    function closeEscModal(evt) {
      if (evt.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeEscModal);

    return () => {
      document.removeEventListener("keydown", closeEscModal);
    };
  }, []);

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
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
