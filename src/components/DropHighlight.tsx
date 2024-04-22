interface DropHighlightProps {
  prevId: string;
  column: string;
}

const DropHighlight: React.FC<DropHighlightProps> = ({ prevId, column }) => {
  return (
    <div
      data-before={prevId || "-1"}
      data-column={column}
      className="h-[2px] my-1 w-full bg-violet-200 opacity-0 rounded-full"
    />
  );
};

export default DropHighlight;
