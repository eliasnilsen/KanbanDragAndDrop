import Column from "./Column";
import { useCardStore } from "../utils/useCards";

const Board = () => {
  const { cards } = useCardStore((state) => {
    return { cards: state.cards };
  });

  return (
    <div className="flex h-full w-full overflow-scroll gap-4 p-4">
      <Column
        title="Backlog"
        headingColor="text-red-200"
        column="backlog"
        cards={cards}
      />
      <Column
        title="Doing"
        headingColor="text-green-200"
        column="doing"
        cards={cards}
      />
      <Column
        title="Review"
        headingColor="text-blue-200"
        column="review"
        cards={cards}
      />
      <Column
        title="Done"
        headingColor="text-pink-200"
        column="done"
        cards={cards}
      />
    </div>
  );
};

export default Board;
