import PropTypes from "prop-types";
import styleModalOverlay from "./modal-overlay.module.css";

function ModalOverlay({ onCloseModal }) {
  return (
    <div className={styleModalOverlay.overlay} onClick={onCloseModal}></div>
  );
}

ModalOverlay.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
