import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../services/actions/ingredients";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const [orderModal, setOrderModal] = React.useState(false);
  const bunImage = ingredients[0] === undefined ? "" : ingredients[0].image;
  const initialValue = 0;

  const openModal = () => {
    dispatch(getOrderDetails(ingredients, setOrderModal));
  };

  const closeModal = () => {
    setOrderModal(false);
  };

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
            {ingredients
              .map((ingredient) => ingredient.price)
              .reduce((previous, current) => previous + current, initialValue)}
            <CurrencyIcon type="primary" />
          </p>
          <div onClick={openModal}>
            <Button type="primary" size="large" htmlType="button">
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>

      {orderModal && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
