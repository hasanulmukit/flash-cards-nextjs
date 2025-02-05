// components/Flashcard.jsx
"use client";
import React, { useState } from "react";

export default function Flashcard({
  card,
  onDelete,
  onEdit,
  onMarkForReview, // New: marks a card as ready for review
  reviewMode = false,
  onReview, // Function(cardId, rating) used in review mode
}) {
  const [flipped, setFlipped] = useState(false);

  // In review mode, we display rating buttons.
  const handleReview = (rating) => {
    if (onReview) {
      onReview(card.id, rating);
    }
  };

  return (
    <div
      className="relative w-80 h-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105"
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div className="absolute inset-0 p-4 flex flex-col justify-center items-center text-center transition-transform duration-300">
        {!flipped && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Q: {card.question}
            </h2>
            {card.category && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Category: {card.category}
              </p>
            )}
          </div>
        )}
        {flipped && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              A: {card.answer}
            </h2>
          </div>
        )}
      </div>
      {/* Top-right action buttons */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(card);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
      {/* In study mode, add a "Mark for Review" button */}
      {!reviewMode && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkForReview(card.id);
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-2 py-1 rounded"
          >
            Mark for Review
          </button>
        </div>
      )}
      {/* In review mode, show quality rating buttons */}
      {reviewMode && (
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleReview("again")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded"
          >
            Again
          </button>
          <button
            onClick={() => handleReview("good")}
            className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
          >
            Good
          </button>
        </div>
      )}
    </div>
  );
}
