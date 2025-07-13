import React, { useState } from 'react';
import styles from '../styles/components/chessboard.module.scss'
import { isValidMove } from '../utils/chessRules';
// import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { 
  initializeBoard, 
  selectPiece, 
  movePiece, 
  setHoverPosition, 
  resetBoard, 
  undoMove
} from '../store/chessSlice';
import { DndProvider } from 'react-dnd';
import Row from './Row';
import StarRating from './StarRating';
import { Container } from '@mui/material';



interface ChessBoardProps {
  id: string;
}

interface TouchData {
  x: number;
  y: number;
  timestamp: number;
  row: number;
  col: number;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ id }) => {
  const [rating, setRating] = useState<number>(0);
  const dispatch = useDispatch();
  const chessState = useSelector((state: RootState) => state.chess);
  const [touches, setTouches] = React.useState<{ [key: number]: TouchData }>({});

  // Initialize board on component mount
  React.useEffect(() => {
    if (!chessState.board?.[0]?.[0]) {
      dispatch(initializeBoard());
    }
  }, [dispatch, chessState.board]);

  // Log board state for debugging
  React.useEffect(() => {
    console.log('Board state:', chessState.board);
  }, [chessState.board]);

  // Destructure state after initialization
  const { board, selectedPiece, hoverPosition, isWhiteTurn, moveHistory, capturedPieces } = chessState;

  // Handle case where board is still not initialized
  if (!board?.[0]?.[0]) {
    return <div>Loading chess board...</div>;
  }

  const handleSquareClick = (row: number, col: number) => {
    const piece = board[row][col];
    
    if (!piece) {
      // If no piece selected, clear selection
      if (!selectedPiece) {
        dispatch(setHoverPosition({ row: -1, col: -1 }));
        return;
      }

      // If piece selected, try to move it
      const fromPosition = selectedPiece;
      const toPosition = { row, col };
      const movingPiece = board[fromPosition.row][fromPosition.col];
      
      if (movingPiece && isValidMove(fromPosition, toPosition, board, movingPiece)) {
        dispatch(movePiece(toPosition));
      }
      dispatch(setHoverPosition({ row: -1, col: -1 }));
      return;
    }

    // Only select pieces of the current player's color
    if (piece.color === (isWhiteTurn ? 'white' : 'black')) {
      dispatch(selectPiece({ row, col }));
      dispatch(setHoverPosition(null));
    }
  };

  const handleSquareDoubleClick = (row: number, col: number) => {
    const piece = board[row][col];
    
    if (!piece) return;
    
    // Get the current selected piece
    const selected = selectedPiece || { row: -1, col: -1 };
    const fromPiece = board[selected.row][selected.col];
    
    if (fromPiece && isValidMove(selected, { row, col }, board, fromPiece)) {
      // Create a copy of the board state to check for captures
      // const boardCopy = JSON.parse(JSON.stringify(board));
      // const capturedPiece = boardCopy[row][col];
      
      dispatch(movePiece({ row, col }));
    }
    dispatch(setHoverPosition({ row: -1, col: -1 }));
  };

  const handleTouchStart = (row: number, col: number, e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    const touch = e.touches[0];
    const touchId = touch.identifier;
    
    // Store touch information
    setTouches(prev => ({
      ...prev,
      [touchId]: {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: now,
        row,
        col
      }
    }));
  };

  const handleTouchEnd = (row: number, col: number, e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    const touchId = touch.identifier;
    const touchData = touches[touchId];
    
    if (touchData && Date.now() - touchData.timestamp < 300) {
      // Double tap detected
      handleSquareDoubleClick(row, col);
    } else {
      // Single tap
      handleSquareClick(row, col);
    }
    
    // Clean up touch data
    setTouches(prev => {
      const newTouches = { ...prev };
      delete newTouches[touchId];
      return newTouches;
    });
  };

  const handleReset = () => {
    dispatch(resetBoard());
  };

  const handleBack = () => {
    dispatch(undoMove());
  };

  // const handleKeyDown = (event: React.KeyboardEvent, row: number, col: number) => {
  //   if (event.key === 'Escape') {
  //     dispatch(setHoverPosition({ row: -1, col: -1 }));
  //   }
  // };

  return (
    <DndProvider backend={HTML5Backend}>
        <Container  maxWidth="lg" sx={{ py: 8 }} className='chessboard__container'>
      <div className="chessboard__stars">
        <div className="chessboard__header">
          <h2>Let's take a break and play Chess Game</h2>
        </div>
        <StarRating
          initialValue={rating}
          onRate={setRating}
          size="medium"
        />
      </div>
      <div className="chessboard">
        <div className="chessboard__controls">
          <button 
            className="chessboard__button"
            onClick={handleReset}
          >
            Reset
          </button>
          <button 
            className="chessboard__button"
            onClick={handleBack}
            disabled={moveHistory.length === 0}
          >
            Back
          </button>
          <button 
            className="chessboard__button"
            onClick={() => {}}
            disabled={moveHistory.length === 0}
          >
            Forward
          </button>
        </div>
        <div className={styles['chessboard__captured']}>
          <div className={styles['chessboard__captured--white']}>
            {capturedPieces.white.map((piece, index) => (
              <div
                key={index}
                className={`${styles['chessboard__captured__piece']} ${styles[`chessboard__piece--${piece.color}-${piece.type}`]}`}
              />
            ))}
          </div>
          <div className={styles['chessboard__captured--black']}>
            {capturedPieces.black.map((piece, index) => (
              <div
                key={index}
                className={`${styles['chessboard__captured__piece']} ${styles[`chessboard__piece--${piece.color}-${piece.type}`]}`}
              />
            ))}
          </div>
        </div>
        <div className={styles['chessboard__grid']}>
          {board.map((row, rowIndex) => (
            <Row
              key={rowIndex}
              rowIndex={rowIndex}
              selectedPiece={selectedPiece}
              handleSquareClick={handleSquareClick}
              handleSquareDoubleClick={handleSquareDoubleClick}
              handleTouchStart={handleTouchStart}
              handleTouchEnd={handleTouchEnd}
              setHoverPosition={setHoverPosition}
              hoverPosition={hoverPosition}
              board={board}
              isWhiteTurn={isWhiteTurn}
            />
          ))}
        </div>
      </div>
      </Container>
    </DndProvider>
  );
};

export default ChessBoard;
