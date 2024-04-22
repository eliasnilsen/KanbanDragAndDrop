import { useState } from "react";
import { Card as Cardtype, ColumnProps } from "../utils/types";
import AddCard from "./AddCard";
import Card from "./Card";

const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  column,
  cards,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: Cardtype) => {
    const setData = e.dataTransfer?.setData("cardId", card.id);
  };

  const columnCards = cards?.filter((card) => card.column === column);
  return (
    <div className="flex flex-col flex-1 shrink-0 space-y-2 rounded-md">
      <div className={`flex items-center justify-between ${headingColor} px-4`}>
        <h2 className={`font-medium text-lg`}>{title}</h2>
        <span>{columnCards?.length}</span>
      </div>
      <div
        className={`h-full w-full transition-colors space-y-2 ${
          isActive ? "bg-slate-800/50" : "bg-slate-800/0"
        } `}
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
        <AddCard column={column} />
      </div>
    </div>
  );
};

export default Column;
