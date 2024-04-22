import { motion } from "framer-motion";
import { DragCard } from "../utils/types";
import DropHighlight from "./DropHighlight";

const Card: React.FC<DragCard> = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropHighlight prevId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        className="cursor-grab active:cursor-grabbing rounded-md border border-slate-700 bg-slate-800 p-3"
        draggable="true"
        onDragStart={(e: DragEvent) =>
          handleDragStart(e, { title, id, column })
        }
      >
        <p className="text-neutral-50">{title}</p>
      </motion.div>
    </>
  );
};

export default Card;
