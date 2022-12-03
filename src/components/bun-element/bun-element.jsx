import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bunElementStyles from "./bun-element.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import loadingBun from "../../images/loadingBun.svg";

function BunElement({ type }) {
  const bun = useSelector((store) => store.ingredientsConstructor.bun);

  return (
    <div className={`${bunElementStyles.bun} mr-4`}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={
          bun?.name
            ? `${bun?.name} ${type === "top" ? "(верх)" : "(низ)"}`
            : "Выберите булку"
        }
        price={bun?.price}
        thumbnail={bun?.image ? bun.image : loadingBun}
      />
    </div>
  );
}

BunElement.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BunElement;
