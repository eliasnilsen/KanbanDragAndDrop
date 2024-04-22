export interface Card {
  title: string;
  id: string;
  column: string;
}

export interface DragCard {
  handleDragStart: (e: DragEvent, card: Card) => void;
  title: string;
  id: string;
  column: string;
}

export interface ColumnProps {
  title: string;
  headingColor: string;
  column: string;
  cards: Card[] | [];
}
