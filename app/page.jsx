// app/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import FlashcardForm from "../components/FlashcardForm";
import FlashcardList from "../components/FlashcardList";
import { FaMoon, FaSun } from "react-icons/fa";

// Helper: get today's date at midnight
const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// Spaced repetition update function (simplified)
// Each card has: interval (days), ease factor, and dueDate.
const updateSpacedRepetition = (card, rating) => {
  const now = today();
  let newInterval = 1;
  let newEase = card.ease || 2.5;
  if (rating === "again") {
    newInterval = 1;
    newEase = Math.max(1.3, newEase - 0.2);
  } else if (rating === "good") {
    newInterval = card.interval ? Math.round(card.interval * newEase) : 1;
    newEase = Math.min(newEase + 0.1, 2.8);
  }
  const dueDate = new Date(now);
  dueDate.setDate(dueDate.getDate() + newInterval);
  return { interval: newInterval, ease: newEase, dueDate: dueDate.toISOString() };
};

export default function HomePage() {
  // Flashcards state
  const [flashcards, setFlashcards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [mode, setMode] = useState("study"); // "study" or "review"
  const [categoryFilter, setCategoryFilter] = useState("all");
  // For progress statistics in review mode
  const [reviewedCount, setReviewedCount] = useState(0);
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // On mount, load flashcards and dark mode preference.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCards = localStorage.getItem("flashcards");
      if (storedCards) {
        setFlashcards(JSON.parse(storedCards));
      }
      const savedDark = localStorage.getItem("darkMode");
      if (savedDark === "true") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Persist flashcards
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
    }
  }, [flashcards]);

  // Derive categories from flashcards.
  const categories = Array.from(
    new Set(flashcards.map((card) => card.category).filter((cat) => cat))
  );

  // Handler for adding or editing a flashcard.
  const handleSaveFlashcard = (cardData) => {
    if (cardData.id) {
      setFlashcards((prev) =>
        prev.map((card) => (card.id === cardData.id ? { ...card, ...cardData } : card))
      );
      setEditingCard(null);
    } else {
      const newCard = {
        ...cardData,
        id: Date.now().toString(),
        interval: 0,
        ease: 2.5,
        dueDate: new Date().toISOString(), // not due by default
      };
      setFlashcards((prev) => [newCard, ...prev]);
    }
  };

  const handleDeleteFlashcard = (id) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
    if (editingCard && editingCard.id === id) {
      setEditingCard(null);
    }
  };

  const handleEditFlashcard = (card) => {
    setEditingCard(card);
    setMode("study");
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
  };

  // Mark a flashcard for review by setting its dueDate to today.
  const handleMarkForReview = (id) => {
    setFlashcards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, dueDate: today().toISOString(), interval: 1 } // Mark as due immediately
          : card
      )
    );
  };

  // When reviewing, update spaced repetition properties based on the rating.
  const handleReviewFlashcard = (id, rating) => {
    setFlashcards((prev) =>
      prev.map((card) => {
        if (card.id === id) {
          const updated = updateSpacedRepetition(card, rating);
          return { ...card, ...updated };
        }
        return card;
      })
    );
    setReviewedCount((prev) => prev + 1);
  };

  // Filter flashcards by category if selected.
  const filteredFlashcards =
    categoryFilter === "all"
      ? flashcards
      : flashcards.filter((card) => card.category === categoryFilter);

  // In review mode, show only cards due for review.
  const dueFlashcards = filteredFlashcards.filter((card) => {
    const due = new Date(card.dueDate);
    return due <= today();
  });

  // Dark mode toggle.
  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newVal);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto py-10 px-4">
        {/* Header with title, mode toggle, and dark mode toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-green-900 dark:text-gray-100">
            FocusStudy
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setMode("study")}
              className={`px-4 py-2 rounded ${
                mode === "study"
                  ? "bg-green-700 text-white"
                  : "bg-green-200 text-green-900"
              } transition-colors`}
            >
              Study Mode
            </button>
            <button
              onClick={() => setMode("review")}
              className={`px-4 py-2 rounded ${
                mode === "review"
                  ? "bg-green-700 text-white"
                  : "bg-green-200 text-green-900"
              } transition-colors`}
            >
              Review Mode
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-green-200 dark:bg-gray-700 text-green-900 dark:text-gray-100 transition-colors"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        {/* In study mode, display the FlashcardForm */}
        {mode === "study" && (
          <FlashcardForm
            onSave={handleSaveFlashcard}
            editingCard={editingCard}
            onCancelEdit={handleCancelEdit}
            categories={categories}
          />
        )}

        {/* Progress Statistics (only in review mode) */}
        {mode === "review" && (
          <div className="mb-4 text-center">
            <p className="text-gray-800 dark:text-gray-100">
              Total Due: {dueFlashcards.length} | Reviewed this session: {reviewedCount}
            </p>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex justify-center mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Flashcard List */}
        <div className="mt-4">
          <FlashcardList
            cards={mode === "review" ? dueFlashcards : filteredFlashcards}
            onDelete={handleDeleteFlashcard}
            onEdit={handleEditFlashcard}
            onMarkForReview={handleMarkForReview}
            reviewMode={mode === "review"}
            onReview={handleReviewFlashcard}
          />
        </div>
      </div>
    </main>
  );
}
