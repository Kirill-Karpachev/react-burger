import { useState, useMemo } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BUN_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_ALL_INGREDIENTS,
  getOrderDetails,
} from "../../services/actions/ingredients";
import { useDrop } from "react-dnd";
import BunElement from "../bun-element/bun-element";
import StuffingElement from "../stuffing-element/stuffing-element";
import { v4 as uuidv4 } from "uuid";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredientsConstructor);
  const [orderModal, setOrderModal] = useState(false);

  const orderPrice = useMemo(() => {
    return (
      (ingredients.bun ? ingredients.bun.price * 2 : 0) +
      ingredients.ingredients.reduce(
        (previous, current) => previous + current.price,
        0
      )
    );
  }, [ingredients]);

  const orderIngredients = [
    ingredients.bun._id,
    ...ingredients.ingredients.map((ingredient) => ingredient._id),
    ingredients.bun._id,
  ];

  const openModal = () => {
    dispatch(getOrderDetails(orderIngredients, setOrderModal));
    dispatch({
      type: DELETE_ALL_INGREDIENTS,
    });
  };

  const closeModal = () => {
    setOrderModal(false);
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (item.type === "bun") {
        return dispatch({
          type: ADD_BUN_INGREDIENT,
          payload: item,
        });
      }
      dispatch({
        type: ADD_INGREDIENTS,
        payload: { ...item, id: uuidv4() },
      });
    },
  });

  const transform = isHover ? "scale(1.03)" : "scale(1)";

  return (
    <>
      <section
        className={`${burgerConstructorStyles.section} mt-25`}
        ref={dropTarget}
      >
        <div
          className="mb-10"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "flex-end",
            transform,
            transition: "all .1s linear",
          }}
        >
          <BunElement type="top" />

          <ul className={burgerConstructorStyles.container}>
            {ingredients.ingredients.map((ingredient, index) => {
              return (
                <StuffingElement
                  key={ingredient.id}
                  ingredient={ingredient}
                  index={index}
                />
              );
            })}
          </ul>
          <BunElement type="bottom" />
        </div>
        <div className={burgerConstructorStyles.order}>
          <p
            className={`${burgerConstructorStyles.price} text text_type_digits-medium`}
          >
            {orderPrice}
            <CurrencyIcon type="primary" />
          </p>
          <div onClick={openModal}>
            <Button
              type="primary"
              size="large"
              htmlType="button"
              disabled={!ingredients.bun}
            >
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
