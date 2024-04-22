import { create } from "zustand";
import { Card } from "./types";
import { exampleCards } from "./cards";

interface useCardStoreProps {
  cards: Card[] | [];
  setNewCard: (newCard: Card) => void;
  setDeleteCard: (cardId: string) => void;
}

export const useCardStore = create<useCardStoreProps>((set) => ({
  cards: exampleCards,

  setNewCard: (newCard) =>
    set((state) => ({ cards: [...state.cards, newCard] })),

  setDeleteCard: (cardId) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== cardId),
    })),
}));
