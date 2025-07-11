import React, { useState, useEffect } from 'react';
import styles from './MemoryMatchGame.module.scss';
import StarRating from './StarRating';

interface Card {
  id: number;
  value: string;
  matched: boolean;
  flipped: boolean;
}

const MemoryMatchGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [rating, setRating] = useState<number>(0);

  // Create initial cards with pairs
  const createCards = (): Card[] => {
    const symbols = ['😀', '😂', '😍', '🤔', '😎', '🤩', '🥳', '😴', '🥰'];
    const tempCards: Card[] = [];
    
    // Create pairs
    symbols.forEach(symbol => {
      tempCards.push({ id: tempCards.length, value: symbol, matched: false, flipped: false });
      tempCards.push({ id: tempCards.length, value: symbol, matched: false, flipped: false });
    });
    
    // Shuffle cards
    for (let i = tempCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempCards[i], tempCards[j]] = [tempCards[j], tempCards[i]];
    }
    
    return tempCards;
  };

  // Handle card flip
  const handleFlip = (id: number) => {
    if (gameOver || cards[id].matched) return;

    setFlippedCards(prev => [...prev, id]);
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    ));

    // Increment moves whenever we flip a card
    setMoves(prev => prev + 1);

    if (flippedCards.length === 2) {
      setTimeout(() => {
        const [first, second] = flippedCards;
        
        if (cards[first].value === cards[second].value) {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second ? { ...card, matched: true } : card
          ));
        } else {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second ? { ...card, flipped: false } : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Check if game is over
  useEffect(() => {
    const allMatched = cards.every(card => card.matched);
    if (allMatched) {
      setGameOver(true);
    }
  }, [cards]);

  // Reset game
  const resetGame = () => {
    const newCards = createCards();
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className={styles['memory-match']}>
      <div className={styles.header}>
        <h2>Memory Match Game</h2>
        <StarRating
          initialValue={rating}
          onRate={setRating}
          size="medium"
        />
      </div>
      <div className={styles.status}>
        {gameOver ? `Game Over! You won in ${moves} moves!` : `Moves: ${moves}`}
      </div>
      <div className={styles['game-board']}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${card.flipped || card.matched ? styles.flipped : ''}`}
            onClick={() => handleFlip(card.id)}
          >
            <div className={styles['card-inner']}>
              <div className={styles['card-front']} />
              <div className={styles['card-back']}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button onClick={resetGame}>
          {gameOver ? 'Play Again' : 'Reset Game'}
        </button>
      </div>
    </div>
  );
};

export default MemoryMatchGame;
