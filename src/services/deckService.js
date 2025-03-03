// Base URL for the qrandom.io API
const API_BASE_URL = 'https://qrandom.io/api/random';

/**
 * Fetch a shuffled deck from the API
 * @param {number} deckCount - Number of decks to shuffle (default: 1)
 * @param {number} initialCards - Number of cards to return initially (default: all)
 * @returns {Promise<Object>} - The deck data including cards and metadata
 */
export const fetchShuffledDeck = async (deckCount = 1, initialCards = null) => {
  try {
    let url = `${API_BASE_URL}/deck?decks=${deckCount}`;
    
    if (initialCards) {
      url += `&cards=${initialCards}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch deck: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching deck:', error);
    throw error;
  }
};

/**
 * Get all cards from a shuffled deck
 * @param {string} resultId - The ID of the deck result
 * @returns {Promise<Array>} - Array of all cards in the deck
 */
export const getAllCards = async (resultId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deck/${resultId}/all`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch all cards: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching all cards:', error);
    throw error;
  }
};

/**
 * Get a specific card from the deck by index
 * @param {string} resultId - The ID of the deck result
 * @param {number} index - The index of the card to retrieve
 * @returns {Promise<Object>} - The card at the specified index
 */
export const getCardAtIndex = async (resultId, index) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deck/${resultId}/show?at=${index}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch card: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching card:', error);
    throw error;
  }
};

/**
 * Fallback function to create a shuffled deck client-side if API fails
 * @param {number} deckCount - Number of decks to shuffle
 * @returns {Object} - A simulated deck response
 */
export const createFallbackDeck = (deckCount = 1) => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  
  let allCards = [];
  
  // Create the specified number of decks
  for (let d = 0; d < deckCount; d++) {
    for (const suit of suits) {
      for (const rank of ranks) {
        allCards.push({ suit, rank });
      }
    }
  }
  
  // Shuffle the cards (Fisher-Yates algorithm)
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }
  
  // Create a simulated response object
  return {
    id: `fallback-deck-${Date.now()}`,
    deck: {
      decks: deckCount,
      cards: allCards
    },
    resultType: 'shuffledDeck'
  };
};