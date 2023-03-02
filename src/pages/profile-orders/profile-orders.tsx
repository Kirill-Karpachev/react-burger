import FeedCard from "../../components/feed-card/feed-card";
import profileOrdersStyles from "./profile-orders.module.css";
import {
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_START,
} from "../../services/actions/ws-user-actions";
import { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((store) => store.profileOrders);

  useEffect(() => {
    dispatch({ type: WS_USER_CONNECTION_START });
    return () => {
      dispatch({ type: WS_USER_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return userOrders.length !== 0 ? (
    <ul className={profileOrdersStyles.orders}>
      {userOrders?.map((order) => (
        <FeedCard
          key={order._id}
          id={order._id}
          name={order.name}
          number={order.number}
          ingredients={order.ingredients}
          createdAt={order.createdAt}
          status={order.status}
        />
      ))}
    </ul>
  ) : (
    <p className={`${profileOrdersStyles.text} text text_type_main-large`}>
      История заказов пуста.
    </p>
  );
};

export default ProfileOrders;
