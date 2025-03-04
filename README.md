# Klyra Casino - Blackjack Game

A modern, interactive Blackjack game built with React, Vite, and Tailwind CSS. This project demonstrates the use of the qrandom.io API for card shuffling and dealing.

![Blackjack Game Screenshot](screenshot.png)

## 🎮 Live Demo

[Play Klyra Blackjack](https://klyra-blackjack.vercel.app/)

## 🃏 How We Use the qrandom.io API

This Blackjack game utilizes the qrandom.io API for generating truly random shuffled decks of cards. The API integration works as follows:

### API Endpoints Used

- `GET /api/random/deck` - To get a shuffled deck of cards
- `GET /api/random/deck/:resultId/all` - To retrieve all cards from a shuffled deck
- `GET /api/random/deck/:resultId/show` - To retrieve a specific card from the deck

### Card Structure

Each card follows the API's structure:

```json
{
  "suit": "diamonds", // hearts, diamonds, clubs, spades
  "rank": "10"        // 2-10, jack, queen, king, ace
}
```

### Implementation Details

1. **Deck Initialization**: We fetch a shuffled deck from the API with a configurable number of decks (1-8, with 6 being the casino standard).

2. **Fallback Mechanism**: In case the API is unavailable, we've implemented a client-side fallback that creates and shuffles decks with the same structure.

3. **Card Rendering**: Our `Card` component takes the card object with `suit` and `rank` properties and renders a visually appealing card with the correct suit symbol and rank.

4. **Game Logic**: The game logic uses the card structure to calculate hand values, determine winners, and handle special cases like blackjacks and aces (which can be worth 1 or 11).

## 🚀 Features

- **Realistic Card Animations**: Cards flip and deal with smooth animations
- **Multiple Deck Support**: Play with 1-8 decks like in a real casino
- **Betting System**: Place bets and track your balance
- **Game Statistics**: Track wins, losses, pushes, and blackjacks
- **Responsive Design**: Play on any device
- **Casino Rules**: Follows standard casino Blackjack rules

## 🛠️ Technologies Used

- **React**: For building the user interface
- **Vite**: For fast development and optimized builds
- **Tailwind CSS**: For styling
- **Framer Motion**: For animations
- **qrandom.io API**: For truly random card shuffling

## 🏗️ Project Structure

```
klyraBlackjack/
├── public/
├── src/
│   ├── components/
│   │   ├── Card.jsx              # Card component with flip animation
│   │   ├── DealerHand.jsx        # Dealer's hand display
│   │   ├── GameStatus.jsx        # Game status messages
│   │   ├── PlayerHand.jsx        # Player's hand display
│   │   ├── Stats.jsx             # Game statistics
│   │   └── common/
│   │       └── Layout.jsx        # Common layout wrapper
│   ├── pages/
│   │   ├── About.jsx             # About page
│   │   ├── Blackjack.jsx         # Main Blackjack game
│   │   └── Home.jsx              # Home page with 3D chips
│   ├── services/
│   │   └── deckService.js        # API integration for deck operations
│   ├── utils/
│   │   └── gameLogic.js          # Game logic functions
│   ├── App.jsx                   # Main app component with routing
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
└── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/klyra-blackjack.git
   cd klyra-blackjack
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎲 How to Play

1. Select the number of decks and bet amount
2. Click "Deal Cards" to start a new game
3. Choose to "Hit" for another card or "Stand" to keep your current hand
4. Try to get closer to 21 than the dealer without going over
5. Blackjack (an Ace and a 10-value card) pays 3:2

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [qrandom.io](https://qrandom.io) for providing the API for shuffled card decks
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Framer Motion](https://www.framer.com/motion/) for the animations
- [Lucide Icons](https://lucide.dev) for the beautiful icons
