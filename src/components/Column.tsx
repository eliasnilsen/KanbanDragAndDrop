import { useState } from "react";
import { Card as Cardtype, ColumnProps } from "../utils/types";
import AddCard from "./AddCard";
import Card from "./Card";
import DropHighlight from "./DropHighlight";
import { useCardStore } from "../utils/useCards";

const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  column,
  cards,
}) => {
  const [isActive, setIsActive] = useState(false);
  const { setCards } = useCardStore((state) => {
    return {
      setCards: state.setCards,
    };
  });

  const handleDragStart = (e: DragEvent, card: Cardtype) => {
    e.dataTransfer?.setData("cardId", card.id);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    dropIndicator(e);
    setIsActive(true);
  };

  const handleDragLeave = () => {
    clearDropHighlights();
  };

  const handleDrop = (e: DragEvent) => {
    clearDropHighlights();

    const cardId = e.dataTransfer?.getData("cardId");

    const indicators = getDropIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const slot = element.dataset.before || "-1";

    if (slot !== cardId) {
      let copy = [...cards];

      //gets the card we want to move, AKA the one we are dragging
      let transferCard = copy.find((card) => card.id === cardId);
      if (!transferCard) return;

      //updates the column field based on drop location
      transferCard = { ...transferCard, column };

      //filters the card out of the cards list
      copy = copy.filter((card) => card.id !== cardId);

      //place at last index in the list or find index based on indicator element
      const moveToLast = slot === "-1";
      if (moveToLast) {
        copy.push(transferCard);
      } else {
        const insertCardAtIndex = copy.findIndex(
          (element) => element.id === slot
        );
        if (insertCardAtIndex === undefined) return;
        copy.splice(insertCardAtIndex, 0, transferCard);
      }

      setCards(copy);
    }
  };

  const clearDropHighlights = (elements?: Element[]) => {
    const indicators = elements || getDropIndicators();

    indicators.forEach((element) => {
      element.style.opacity = "0";
    });
  };

  const getDropIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const dropIndicator = (e: DragEvent) => {
    const indicators = getDropIndicators();
    clearDropHighlights(indicators);
    const element = getNearestIndicator(e, indicators);
    element.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: Element[]) => {
    const DISTANCE_OFFSET = 50;

    const nearestIndicator = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return nearestIndicator;
  };

  const columnCards = cards?.filter((card) => card.column === column);
  return (
    <div className="flex flex-col flex-1 shrink-0 rounded-md bg-slate-400/10 p-2">
      <div
        className={`flex items-center justify-between ${headingColor} lg:px-4`}
      >
        <h2 className={`font-medium text-lg`}>{title}</h2>
        <span>{columnCards?.length}</span>
      </div>
      <div
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`h-full w-full transition-colors ${isActive ? "" : ""} `}
      >
        {columnCards?.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            column={card.column}
            id={card.id}
            handleDragStart={handleDragStart}
          />
        ))}
        <DropHighlight column={column} prevId="-1" />
        <AddCard column={column} />
      </div>
    </div>
  );
};

export default Column;
