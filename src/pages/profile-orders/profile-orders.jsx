import { useSelector } from "react-redux";
import FeedCard from "../../components/feed-card/feed-card";

import profileOrdersStyles from "./profile-orders.module.css";

function ProfileOrders() {
  const { userOrders } = useSelector((store) => store.profileOrders);

  return (
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
  );
}

export default ProfileOrders;
