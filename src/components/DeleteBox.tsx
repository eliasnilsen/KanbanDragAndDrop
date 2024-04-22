import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useCardStore } from "../utils/useCards";

const DeleteBox = () => {
  const { setDeleteCard } = useCardStore((state) => {
    return { setDeleteCard: state.setDeleteCard };
  });

  const [isActive, setIsActive] = useState(false);

  //dragging over the box sets the active state to true
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsActive(true);
  };

  //dragging out of the box sets the active state to false
  const handleDragLeave = () => {
    setIsActive(false);
  };

  //handles the deletion of the card
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    setDeleteCard(cardId);
    setIsActive(false);
  };

  return (
    <div
      className={`h-56 w-56 shrink-0 place-content-center rounded-md ${
        isActive
          ? "bg-red-700/20 border border-red-700/50"
          : "border border-slate-700 bg-slate-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
    >
      <LuTrash2
        className={`m-auto ${isActive ? "animate-bounce text-red-700/50" : ""}`}
        size={30}
      />
    </div>
  );
};

export default DeleteBox;
