import FeedCard from "../feed-card/feed-card";
import feedListStyles from "./feed-list.module.css";
import { FC } from "react";
import { useSelector } from "../../utils/hooks";

const FeedList: FC = () => {
  const { orders } = useSelector((store) => store.feed);

  return (
    <ul className={feedListStyles.list}>
      {orders?.map((order) => (
        <FeedCard
          key={order._id}
          id={order._id}
          name={order.name}
          number={order.number}
          ingredients={order.ingredients}
          createdAt={order.createdAt}
        />
      ))}
    </ul>
  );
};

export default FeedList;
