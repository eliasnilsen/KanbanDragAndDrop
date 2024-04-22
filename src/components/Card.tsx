import { motion } from "framer-motion";
import { DragCard } from "../utils/types";
import DropHighlight from "./DropHighlight";
import { LuX } from "react-icons/lu";
import { useCardStore } from "../utils/useCards";

const Card: React.FC<DragCard> = ({ title, id, column, handleDragStart }) => {
  const { setDeleteCard } = useCardStore((state) => {
    return {
      setDeleteCard: state.setDeleteCard,
    };
  });

  return (
    <>
      <DropHighlight prevId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        className="cursor-grab active:cursor-grabbing rounded-md border border-slate-700 bg-slate-800 p-3 relative"
        draggable="true"
        onDragStart={(e: DragEvent) =>
          handleDragStart(e, { title, id, column })
        }
      >
        <LuX
          size={20}
          className="absolute right-0.5 top-0.5 cursor-pointer xl:hidden hover:text-red-600 transition-colors"
          onClick={() => setDeleteCard(id)}
        />
        <p className="text-neutral-50">{title}</p>
      </motion.div>
    </>
  );
};

export default Card;
