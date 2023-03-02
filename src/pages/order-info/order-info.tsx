import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";
import { useLocation, useParams } from "react-router-dom";
import IngredientItem from "../../components/ingredient-item/ingredient-item";
import orderInfoStyles from "./order-info.module.css";
import { useMemo, useEffect } from "react";
import { currentDate } from "../../utils/util";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws-actions";
import {
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_START,
} from "../../services/actions/ws-user-actions";
import { FC } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { TFeed, TIngredient } from "../../types/types";
import { Status } from "../../utils/const";

const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (location.pathname === `/feed/${id}`) {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    } else if (location.pathname === `/profile/orders/${id}`) {
      dispatch({ type: WS_USER_CONNECTION_START });
      return () => {
        dispatch({ type: WS_USER_CONNECTION_CLOSED });
      };
    }
  }, [dispatch, id, location.pathname]);

  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const { orders } = useSelector((store) => store.feed);
  const { userOrders } = useSelector((store) => store.profileOrders);

  const unique = (arr: Array<TIngredient>) => {
    return Array.from(new Set(arr));
  };

  let itemData: any;
  if (location.pathname === `/feed/${id}`) {
    itemData = orders;
  } else if (location.pathname === `/profile/orders/${id}`) {
    itemData = userOrders;
  }

  const order = itemData?.find((order: TFeed) => order._id === id);
  const ingredients = order?.ingredients?.map((id: string) =>
    ingredientsData?.find((ingredient) => ingredient._id === id)
  );

  const date = order?.createdAt ? new Date(order?.createdAt) : 0;
  const time = date ? format(date, "k:mm") : 0;

  const price = useMemo(
    () =>
      ingredients?.reduce(
        (total: number, item: TIngredient) => total + item.price,
        0
      ),
    [ingredients]
  );

  const count = (id: string) => {
    return order?.ingredients?.filter((item: string) => item === id).length;
  };

  const orderStatus = (status: Status) => {
    if (status === "done") {
      return (
        <p
          className={`${orderInfoStyles.done} text text_type_main-default mt-2`}
        >
          Выполнен
        </p>
      );
    }

    if (status === "created") {
      return <p className={`text text_type_main-default mt-2`}>Создан</p>;
    }

    if (status === "pending") {
      return <p className={`text text_type_main-default mt-2`}>Готовится</p>;
    }
  };

  return (
    <div className={orderInfoStyles.order}>
      <p className="text text_type_digits-default">#{order?.number}</p>
      <h3 className="text text_type_main-medium mt-10 mb-3">{order?.name}</h3>
      {orderStatus(order?.status)}
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={orderInfoStyles.list}>
        {unique(ingredients)?.map((ingredient, index) => (
          <IngredientItem
            key={index}
            ingredient={ingredient}
            count={count(ingredient._id)}
          />
        ))}
      </ul>
      <div className={`${orderInfoStyles.time} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {order?.createdAt ? `${currentDate(date)}, ${time} i-GMT+3` : "Время"}
        </p>
        <p className={`${orderInfoStyles.price} text text_type_digits-default`}>
          {price} <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
