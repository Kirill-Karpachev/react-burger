import FeedList from "../../components/feed-list/feed-list";
import FeedStats from "../../components/feed-stats/feed-stats";
import feedStyles from "./feed.module.css";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws-actions";
import { useEffect } from "react";
import { FC } from "react";
import { useDispatch } from "../../utils/hooks";

const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feedStyles.content}>
        <FeedList />
        <FeedStats />
      </div>
    </>
  );
};

export default Feed;
