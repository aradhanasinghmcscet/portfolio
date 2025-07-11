import React, { useState } from 'react';
import styles from './TicTacToe.module.scss';
import StarRating from './StarRating';

interface CellValue {
  value: 'X' | 'O' | null;
  disabled: boolean;
}

const TicTacToe: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [board, setBoard] = useState<CellValue[]>(
    Array(9).fill({ value: null, disabled: false })
  );
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a].value && board[a].value === board[b].value && board[a].value === board[c].value) {
        setWinner(board[a].value);
        setGameOver(true);
        return;
      }
    }

    if (board.every(cell => cell.disabled)) {
      setGameOver(true);
    }
  };

  const handleClick = (index: number) => {
    if (gameOver || board[index].disabled) return;

    const newBoard = [...board];
    newBoard[index] = { value: currentPlayer, disabled: true };
    setBoard(newBoard);

    checkWinner();

    if (!gameOver) {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill({ value: null, disabled: false }));
    setCurrentPlayer('X');
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className={styles['tic-tac-toe']}>
      <div>
      <StarRating
          initialValue={rating}
          onRate={setRating}
          size="medium"
        />
      </div>
      <div className={styles.header}>
        <h2>Tic Tac Toe</h2>
      </div>
      <div className={styles['game-board']}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={cell.disabled}
            className={styles.cell}
          >
            {cell.value}
          </button>
        ))}
      </div>
      <div className={styles.status}>
        {gameOver ? (
          winner ? (
            <span>{winner} wins!</span>
          ) : (
            <span>It's a draw!</span>
          )
        ) : (
          <span>Next player: {currentPlayer}</span>
        )}
      </div>
      <button className={styles['restart-button']} onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
