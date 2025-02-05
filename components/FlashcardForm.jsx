// components/FlashcardForm.jsx
"use client";
import React, { useState, useEffect } from "react";

export default function FlashcardForm({ onSave, editingCard, onCancelEdit, categories = [] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  // Pre-fill form if editing an existing card.
  useEffect(() => {
    if (editingCard) {
      setQuestion(editingCard.question);
      setAnswer(editingCard.answer);
      setCategory(editingCard.category || "");
    } else {
      setQuestion("");
      setAnswer("");
      setCategory("");
    }
  }, [editingCard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onSave({ question, answer, category, id: editingCard ? editingCard.id : null });
      setQuestion("");
      setAnswer("");
      setCategory("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {editingCard ? "Edit Flashcard" : "Add New Flashcard"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="question">
          Question
        </label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          placeholder="Enter the question..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="answer">
          Answer
        </label>
        <input
          id="answer"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          placeholder="Enter the answer..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          type="text"
          list="category-list"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          placeholder="Enter or select a category..."
        />
        <datalist id="category-list">
          {categories.map((cat, idx) => (
            <option key={idx} value={cat} />
          ))}
        </datalist>
      </div>
      <div className="flex justify-end space-x-4">
        {editingCard && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          {editingCard ? "Save Changes" : "Add Flashcard"}
        </button>
      </div>
    </form>
  );
}
