import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { propTypesIngredient } from "../utils/types";
import PropTypes from "prop-types";
import burgerConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ ingredients }) {
  const [orderDetails, setOrderDetails] = React.useState(false);
  const bunImage = ingredients[0] === undefined ? "" : ingredients[0].image;

  return (
    <>
      <section className={`${burgerConstructorStyles.section} mt-25`}>
        <div
          className="mb-10"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "flex-end",
          }}
        >
          <div className="mr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={bunImage}
            />
          </div>

          <ul className={burgerConstructorStyles.container}>
            {ingredients.map((ingredient) => {
              if (ingredient.type !== "bun") {
                return (
                  <li
                    key={ingredient._id}
                    className={`${burgerConstructorStyles.item} mr-2`}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                    />
                  </li>
                );
              }
            })}
          </ul>
          <div className="mr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={bunImage}
            />
          </div>
        </div>
        <div className={burgerConstructorStyles.order}>
          <p
            className={`${burgerConstructorStyles.price} text text_type_digits-medium`}
          >
            610
            <CurrencyIcon type="primary" />
          </p>
          <div onClick={() => setOrderDetails(true)}>
            <Button type="primary" size="large" htmlType="button">
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>

      {orderDetails && (
        <Modal onClose={() => setOrderDetails(false)}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(propTypesIngredient).isRequired,
};

export default BurgerConstructor;
