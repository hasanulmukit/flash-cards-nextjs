# FocusStudy

FocusStudy is a modern Flashcard App built with Next.js (using the App Router) and Tailwind CSS. It is a simple study tool designed to help you memorize information using digital flashcards. With features such as flashcard creation, editing, deletion, category organization, spaced repetition for review, and a clean, concentration-friendly design, FocusStudy is the perfect companion for your study sessions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Flashcard Management:**  
  Create, edit, and delete flashcards easily.
- **Category Organization:**  
  Organize flashcards by category to group related content.
- **Spaced Repetition:**  
  Review flashcards that are due based on a spaced repetition algorithm.
- **Review Mode:**  
  In review mode, only flashcards due for review are displayed.
- **Dark/Light Mode:**  
  Toggle between dark and light themes to suit your environment.
- **Responsive Design:**  
  Optimized for desktops and mobile devices using Tailwind CSS.

## Technologies Used

- **Next.js (App Router):** For server-side rendering and client-side interactions.
- **React:** For building interactive UI components.
- **Tailwind CSS:** For utility-first styling and responsive design.
- **Local Storage:** For data persistence between sessions.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/FocusStudy.git
   cd FocusStudy
   ```

2. Install dependencies:

- Using npm:

  ```bash
  npm install
  ```

- Or using Yarn:

  ```bash
  yarn install
  ```

3.  Run the development server:

        ```bash
        npm run dev
        ````

    4.Open http://localhost:3000 in your browser to view the app.

### Usage

1. Study Mode:

- Create new flashcards using the form at the top. Edit or delete flashcards using the buttons on each card.

2. Review Mode:

- Flashcards due for review (based on spaced repetition) are shown in Review Mode. Use the "Mark for Review" functionality to set cards as ready for review.

3. Filters:

- Use the dropdown filters to narrow down flashcards by category or card type.

4. Dark/Light Mode:

- Toggle dark mode using the button in the header.

Project Structure

- flashlearn/
- ├─ app/
- │ ├─ layout.jsx // Global layout and style imports
- │ └─ page.jsx // Main page rendering the flashcard app
- ├─ components/
- │ ├─ Flashcard.jsx // Single flashcard component
- │ ├─ FlashcardForm.jsx // Form for adding/editing flashcards
- │ └─ FlashcardList.jsx // Displays flashcards in a grid layout
- ├─ app/globals.css // Global Tailwind CSS file
- ├─ package.json // Project configuration and scripts
- └─ tailwind.config.js // Tailwind CSS configuration

### Customization

- Styling:
  Customize the look and feel by editing Tailwind CSS classes in the components or by modifying the tailwind.config.js file.

- Spaced Repetition Algorithm:
  The algorithm for determining review intervals is simplified and can be enhanced to better suit your needs.

- Themes:
  Dark/Light mode is available out of the box, and additional appearance settings can be added as needed.

### Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create your feature branch: git checkout -b feature/your-feature
- Commit your changes: git commit -am 'Add new feature'
- Push to the branch: git push origin feature/your-feature
- Open a Pull Request.

### License

This project is licensed under the MIT License.
