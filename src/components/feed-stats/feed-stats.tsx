import feedStatsStyles from "./feed-stats.module.css";
import { FC } from "react";
import { useSelector } from "../../utils/hooks";

const FeedStats: FC = () => {
  const { total, totalToday } = useSelector((store) => store.feed);
  const { orders } = useSelector((store) => store.feed);

  return (
    <div className={feedStatsStyles.stats}>
      <div className={`${feedStatsStyles.orders} mb-15`}>
        <div className={feedStatsStyles.column}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <ul className={feedStatsStyles.list}>
            {orders?.map(
              (order, index) =>
                order.status === "done" && (
                  <li
                    className={`${feedStatsStyles.done} text text_type_digits-default`}
                    key={index}
                  >
                    {order.number}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={feedStatsStyles.column}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={feedStatsStyles.list}>
            {orders?.map(
              (order, index) =>
                order.status !== "done" && (
                  <li className={`text text_type_digits-default`} key={index}>
                    {order.number}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`${feedStatsStyles.digit} text text_type_digits-large`}>
          {total}
        </p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`${feedStatsStyles.digit} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </div>
  );
};

export default FeedStats;
