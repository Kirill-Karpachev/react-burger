import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { currentDate } from "../../utils/util";
import IngredientItem from "../ingredient-item/ingredient-item";
import orderModalStyles from "./order-modal.module.css";

function OrderModal() {
  const history = useHistory();
  const location = useLocation();

  const { id } = useParams();
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const { orders } = useSelector((store) => store.feed);
  const { userOrders } = useSelector((store) => store.profileOrders);

  const unique = (arr) => {
    return Array.from(new Set(arr));
  };

  let itemData;
  if (location.pathname === `/feed/${id}`) {
    itemData = orders;
  } else if (location.pathname === `/profile/orders/${id}`) {
    itemData = userOrders;
  }

  const order = itemData?.find((order) => order._id === id);
  const ingredients = order.ingredients?.map((id) =>
    ingredientsData?.find((ingredient) => ingredient._id === id)
  );
  const date = new Date(order.createdAt);
  const time = format(new Date(order.createdAt), "k:mm");

  const clearHistory = (e) => {
    e.preventDefault();
    history.replace({ state: {} });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearHistory);
    return () => {
      window.removeEventListener("beforeunload", clearHistory);
    };
  }, []);

  const price = useMemo(
    () => ingredients?.reduce((total, item) => total + item.price, 0),
    [ingredients]
  );

  const count = (id) => {
    return order?.ingredients?.filter((item) => item === id).length;
  };

  const orderStatus = (status) => {
    if (status === "done") {
      return (
        <p className={`${orderModalStyles.done} text text_type_main-default`}>
          Выполнен
        </p>
      );
    }

    if (status === "created") {
      return <p className={`text text_type_main-default`}>Создан</p>;
    }

    if (status === "pending") {
      return <p className={`text text_type_main-default`}>Готовится</p>;
    }
  };

  return (
    <div className={orderModalStyles.order}>
      <p className="text text_type_digits-default">#{order.number}</p>
      <h3 className="text text_type_main-medium mt-10 mb-3">{order.name}</h3>
      {orderStatus(order?.status)}
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={orderModalStyles.list}>
        {unique(ingredients).map((ingredient, index) => (
          <IngredientItem
            key={index}
            ingredient={ingredient}
            count={count(ingredient._id)}
          />
        ))}
      </ul>
      <div className={`${orderModalStyles.time} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {currentDate(date)}, {time} i-GMT+3
        </p>
        <p
          className={`${orderModalStyles.price} text text_type_digits-default`}
        >
          {price} <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
}

export default OrderModal;
