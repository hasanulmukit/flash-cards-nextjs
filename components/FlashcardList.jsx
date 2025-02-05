// components/FlashcardList.jsx
"use client";
import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ cards, onDelete, onEdit, onMarkForReview, reviewMode = false, onReview }) {
  if (cards.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300 text-center">No flashcards available. Please add some!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Flashcard
          key={card.id}
          card={card}
          onDelete={onDelete}
          onEdit={onEdit}
          onMarkForReview={onMarkForReview}
          reviewMode={reviewMode}
          onReview={onReview}
        />
      ))}
    </div>
  );
}
