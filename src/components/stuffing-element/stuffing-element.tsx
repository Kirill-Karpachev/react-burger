import { FC, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../utils/hooks";
import stuffingElementStyles from "./stuffing-element.module.css";
import {
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../services/actions/ingredient-constructor";
import { TIngredient } from "../../types/types";

type TStuffingElement = {
  ingredient: TIngredient;
  index: number;
};

const StuffingElement: FC<TStuffingElement> = ({ ingredient, index }) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const id: any = ingredient.id;

  const [, dropRef] = useDrop({
    accept: "stuffing",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: MOVE_INGREDIENT,
        payload: { dragIndex, hoverIndex },
      });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "stuffing",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  dragRef(dropRef(ref));

  const deleteIngredient = (id: string) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: id,
    });
  };

  return (
    <li
      ref={ref}
      className={`${stuffingElementStyles.item} mr-2`}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => deleteIngredient(id)}
      />
    </li>
  );
};

export default StuffingElement;
