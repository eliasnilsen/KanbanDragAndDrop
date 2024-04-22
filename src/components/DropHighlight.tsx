interface DropHighlightProps {
  prevId: string;
  column: string;
}

const DropHighlight: React.FC<DropHighlightProps> = ({ prevId, column }) => {
  return (
    <span
      data-before={prevId || "-1"}
      data-column={column}
      className="my-1 h-1 w-full bg-vilot-200"
    />
  );
};

export default DropHighlight;
