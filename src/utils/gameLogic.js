/**
 * Calculate the value of a Blackjack hand
 * @param {Array} hand - Array of card objects
 * @returns {number} - The total value of the hand
 */
export const calculateHandValue = (hand) => {
    if (!hand || hand.length === 0) return 0;
    
    let total = 0;
    let aceCount = 0;
    
    // First pass: count all non-ace cards
    for (const card of hand) {
      const rank = card.rank.toLowerCase();
      
      if (rank === 'ace') {
        aceCount++;
      } else if (['king', 'queen', 'jack'].includes(rank)) {
        total += 10;
      } else {
        total += parseInt(rank);
      }
    }
    
    // Second pass: optimize ace values
    for (let i = 0; i < aceCount; i++) {
      // Add 11 if it doesn't bust, otherwise add 1
      if (total + 11 <= 21) {
        total += 11;
      } else {
        total += 1;
      }
    }
    
    return total;
  };
  
  /**
   * Check if a hand has a natural blackjack (21 with 2 cards)
   * @param {Array} hand - Array of card objects
   * @returns {boolean} - True if the hand is a natural blackjack
   */
  export const hasNaturalBlackjack = (hand) => {
    return hand.length === 2 && calculateHandValue(hand) === 21;
  };
  
  /**
   * Check if a hand is busted (over 21)
   * @param {Array} hand - Array of card objects
   * @returns {boolean} - True if the hand is busted
   */
  export const isBusted = (hand) => {
    return calculateHandValue(hand) > 21;
  };
  
  /**
   * Check if dealer should hit (dealer hits on soft 17)
   * @param {Array} hand - Array of card objects
   * @returns {boolean} - True if dealer should hit
   */
  export const shouldDealerHit = (hand) => {
    const value = calculateHandValue(hand);
    
    // Dealer must hit on 16 or lower
    if (value < 17) return true;
    
    // Check for soft 17 (17 with an ace counted as 11)
    if (value === 17) {
      // Count aces that could be counted as 11
      let hasAceAs11 = false;
      let totalWithout11 = 0;
      
      for (const card of hand) {
        if (card.rank.toLowerCase() === 'ace' && !hasAceAs11) {
          // Skip one ace to see if we're dealing with a soft 17
          hasAceAs11 = true;
          continue;
        }
        
        const rank = card.rank.toLowerCase();
        if (['king', 'queen', 'jack'].includes(rank)) {
          totalWithout11 += 10;
        } else if (rank === 'ace') {
          totalWithout11 += 1;
        } else {
          totalWithout11 += parseInt(rank);
        }
      }
      
      // If we have 6 + ace (counted as 11), it's a soft 17
      return totalWithout11 === 6 && hasAceAs11;
    }
    
    return false;
  };
  
  /**
   * Determine the winner of a Blackjack hand
   * @param {Array} playerHand - Player's cards
   * @param {Array} dealerHand - Dealer's cards
   * @returns {string} - Result code: 'player', 'dealer', 'push', 'playerBlackjack', 'dealerBlackjack', 'playerBust', 'dealerBust'
   */
  export const determineWinner = (playerHand, dealerHand) => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    
    // Check for blackjack
    const playerHasBlackjack = hasNaturalBlackjack(playerHand);
    const dealerHasBlackjack = hasNaturalBlackjack(dealerHand);
    
    // Both have blackjack
    if (playerHasBlackjack && dealerHasBlackjack) {
      return 'push';
    }
    
    // Player has blackjack
    if (playerHasBlackjack) {
      return 'playerBlackjack';
    }
    
    // Dealer has blackjack
    if (dealerHasBlackjack) {
      return 'dealerBlackjack';
    }
    
    // Check for busts
    if (isBusted(playerHand)) {
      return 'playerBust';
    }
    
    if (isBusted(dealerHand)) {
      return 'dealerBust';
    }
    
    // Compare values
    if (playerValue > dealerValue) {
      return 'player';
    } else if (dealerValue > playerValue) {
      return 'dealer';
    } else {
      return 'push';
    }
  };
  
  /**
   * Get readable result message from result code
   * @param {string} result - Result code from determineWinner
   * @returns {string} - Human-readable result message
   */
  export const getResultMessage = (result, playerValue, dealerValue) => {
    switch (result) {
      case 'playerBlackjack':
        return 'Blackjack! You win 3:2 on your bet!';
      case 'dealerBlackjack':
        return 'Dealer has Blackjack. You lose.';
      case 'playerBust':
        return `Bust! Your hand (${playerValue}) exceeded 21. You lose.`;
      case 'dealerBust':
        return `Dealer busts with ${dealerValue}. You win!`;
      case 'player':
        return `You win with ${playerValue} against dealer's ${dealerValue}!`;
      case 'dealer':
        return `Dealer wins with ${dealerValue} against your ${playerValue}.`;
      case 'push':
        return `Push! Both you and the dealer have ${playerValue}.`;
      default:
        return '';
    }
  };
  
  /**
   * Initialize a new game with appropriate cards
   * @param {Array} cards - Array of card objects
   * @returns {Object} - Player hand, dealer hand, and remaining cards
   */
  export const initializeGame = (cards) => {
    if (!cards || cards.length < 4) {
      throw new Error('Not enough cards to start a game');
    }
    
    return {
      playerHand: [cards[0], cards[2]],
      dealerHand: [cards[1], cards[3]],
      remainingCards: cards.slice(4)
    };
  };