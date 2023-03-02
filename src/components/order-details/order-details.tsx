import orderDetailsStyles from "./order-details.module.css";
import doneImage from "../../images/done.svg";
import { useSelector } from "../../utils/hooks";
import { FC } from "react";

const OrderDetails: FC = () => {
  const orderNumber = useSelector(
    (store) => store.orderDetails.orderDetails?.order.number
  );

  return (
    <div className={orderDetailsStyles.order}>
      <h2
        className={`${orderDetailsStyles.title} text text_type_digits-large mb-8`}
      >
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImage} alt="done" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
