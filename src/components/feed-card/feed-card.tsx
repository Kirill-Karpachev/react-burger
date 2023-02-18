import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";
import { useMemo } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { currentDate } from "../../utils/util";
import feedCardStyles from "./feed-card.module.css";
import { FC } from "react";
import { useSelector } from "../../utils/hooks";
import { Status } from "../../utils/const";

type TFeedCard = {
  id: string;
  name: string;
  number: number;
  ingredients: Array<string>;
  createdAt: string;
  status?: string;
};

const FeedCard: FC<TFeedCard> = ({
  id,
  name,
  number,
  ingredients,
  createdAt,
  status,
}) => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);

  const date = new Date(createdAt);
  const time = format(new Date(createdAt), "k:mm");
  const ingredientsList = ingredients?.map((item) =>
    ingredientsData?.find((ingredientData) => ingredientData._id === item)
  );

  const price = useMemo(
    () =>
      ingredientsList?.reduce(
        (previous, current) => previous + current?.price!,
        0
      ),
    [ingredientsList]
  );

  const orderStatus = (status: Status | string) => {
    if (status === "done") {
      return (
        <p
          className={`${feedCardStyles.done} text text_type_main-default mt-2`}
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
    <li>
      <Link
        to={{
          pathname: `${url}/${id}`,
          state: { background: location },
        }}
        className={`${feedCardStyles.card} p-6`}
      >
        <div className={feedCardStyles.order}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {currentDate(date)}, {time} i-GMT+3
          </p>
        </div>
        <div>
          <p className="text text_type_main-medium">{name}</p>
          {status ? orderStatus(status) : null}
        </div>

        <div className={feedCardStyles.info}>
          <ul className={feedCardStyles.ingredients}>
            {ingredients.length >= 6 ? (
              <>
                <li className={feedCardStyles.item}>
                  <p
                    className={`${feedCardStyles.count} text text_type_main-default`}
                  >
                    +{ingredientsList?.length - 5}
                  </p>
                  <img
                    src={ingredientsList[5]?.image}
                    alt={ingredientsList[5]?.name}
                    className={feedCardStyles.ingredient}
                  />
                </li>
                {ingredientsList
                  .slice(0, 5)
                  .reverse()
                  .map((ingredientData, index) => (
                    <li className={feedCardStyles.item} key={index}>
                      <img
                        src={ingredientData?.image}
                        alt={ingredientData?.name}
                        className={feedCardStyles.ingredient}
                      />
                    </li>
                  ))}
              </>
            ) : (
              ingredientsList.map((ingredientData, index) => (
                <li className={feedCardStyles.item} key={index}>
                  <img
                    src={ingredientData?.image}
                    alt={ingredientData?.name}
                    className={feedCardStyles.ingredient}
                  />
                </li>
              ))
            )}
          </ul>
          <p
            className={`${feedCardStyles.price} text text_type_digits-default`}
          >
            {price}
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default FeedCard;
