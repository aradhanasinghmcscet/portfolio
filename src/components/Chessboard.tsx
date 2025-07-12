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
  const { board, selectedPiece, hoverPosition, isWhiteTurn, moveHistory, capturedPieces } = useSelector((state: RootState) => {
    return {
      board: state.chess.board,
      selectedPiece: state.chess.selectedPiece,
      hoverPosition: state.chess.hoverPosition,
      isWhiteTurn: state.chess.isWhiteTurn,
      moveHistory: state.chess.moveHistory,
      capturedPieces: {
        white: state.chess.capturedPieces.white,
        black: state.chess.capturedPieces.black
      }
    };
  });
  const [touches, setTouches] = React.useState<{ [key: number]: TouchData }>({});

  // Initialize board on component mount
  React.useEffect(() => {
    dispatch(initializeBoard());
  }, [dispatch]);

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
      
      if (movingPiece && isValidMove(fromPosition, toPosition, movingPiece, board, isWhiteTurn)) {
        
        // Create a copy of the board state to check for captures
        const boardCopy = JSON.parse(JSON.stringify(board));
        const capturedPiece = boardCopy[toPosition.row][toPosition.col];
        
        dispatch(movePiece({
          from: fromPosition,
          to: toPosition,
          piece: movingPiece,
          capturedPiece: capturedPiece || null
        }));
      }
      dispatch(setHoverPosition({ row: -1, col: -1 }));
      return;
    }

    // If piece is selected and clicked again, deselect
    if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
      dispatch(setHoverPosition({ row: -1, col: -1 }));
      return;
    }

    // Select piece
    dispatch(selectPiece({ row, col }));
  };

  const handleSquareDoubleClick = (row: number, col: number) => {
    const piece = board[row][col];
    const fromPiece = board[selectedPiece?.row || 0][selectedPiece?.col || 0];
    
    if (piece && fromPiece && isValidMove(selectedPiece!, { row, col }, fromPiece, board, isWhiteTurn)) {
      // Create a copy of the board state to check for captures
      const boardCopy = JSON.parse(JSON.stringify(board));
      const capturedPiece = boardCopy[row][col];
      
      dispatch(movePiece({
        from: selectedPiece!,
        to: { row, col },
        piece: fromPiece,
        capturedPiece: capturedPiece || null
      }));
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
        <div className='chessboard__container'>
      <div className="chessboard__stars">
        <div className="chessboard__header">
          <h2>Chess Game</h2>
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
      </div>
    </DndProvider>
  );
};

export default ChessBoard;
