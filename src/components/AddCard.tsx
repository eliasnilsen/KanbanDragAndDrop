import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useCardStore } from "../utils/useCards";
import { motion } from "framer-motion";

interface AddCardProps {
  column: string;
}

const AddCard: React.FC<AddCardProps> = ({ column }) => {
  const [cardText, setCardText] = useState("");
  const [isAddingText, setIsAddingText] = useState(false);

  const { setNewCard } = useCardStore((state) => {
    return { setNewCard: state.setNewCard };
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cardText.length) return;

    const newCard = {
      title: cardText.trim(),
      id: Math.random().toString(36).substring(2, 15),
      column,
    };

    setNewCard(newCard);
    setIsAddingText(false);
  };

  return (
    <>
      {isAddingText ? (
        <motion.form onSubmit={handleSubmit} layout>
          <textarea
            onChange={(e) => setCardText(e.target.value)}
            autoFocus
            placeholder="New task..."
            className={`w-full rounded-md text-neutral-100 bg-violet-400/20 border border-violet-400/50 focus:outline-none p-2 placeholder-violet-200`}
          />
          <div className="flex gap-1 items-center">
            <button
              type="submit"
              className="p-2 text-sm text-green-200 font-semibold hover:text-green-200/70 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setIsAddingText(false)}
              className="p-2 text-sm text-neutral-100 hover:text-neutral-100/70 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setIsAddingText(true)}
          className="flex gap-1 m-auto p-2 items-center transition-colors text-neutral-100 hover:text-neutral-100/50"
        >
          <span>New card</span>
          <LuPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
