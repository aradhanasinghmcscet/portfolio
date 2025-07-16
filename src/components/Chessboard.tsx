import React from 'react';
import { Box, Button } from '@mui/material';
import styles from '../styles/components/chessboard.module.scss';
import { isValidMove, getGameStatus, getSuggestedMoves } from '../utils/chessRules';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
// import { ChessState } from '../store/chessSlice';
import {
  selectPiece,
  movePiece,
  setBoard,
  resetBoard,
  initializeBoard,
  undoMove,
  setGameStatus,
  // ChessPiece,
  setHoverPosition,
  SelectedPiecePosition
} from '../store/chessSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Row from './Row';



interface ChessBoardProps {
  id?: string;
}

interface TouchData {
  x: number;
  y: number;
  timestamp: number;
  row: number;
  col: number;
}

const ChessBoard: React.FC<ChessBoardProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chessState = useSelector((state: RootState) => state.chess);
  const {
    board,
    selectedPiece,
    isWhiteTurn,
    hoverPosition,
    moveHistory,
    gameStatus,
    halfMoveClock,
    fullMoveNumber
  } = useSelector((state: RootState) => state.chess);

  const [touches, setTouches] = React.useState<Record<number, TouchData>>({});

  React.useEffect(() => {
    // Initialize board only if it's not already initialized
    if (!board?.[0]?.[0]) {
      dispatch(initializeBoard());
    }
    dispatch(setGameStatus('in-progress'));
  }, [dispatch, board]);

  React.useEffect(() => {
    if (board?.[0]?.[0]) { // Only check game status if board is initialized
      const gameState = {
        board,
        isWhiteTurn,
        moveHistory,
        halfMoveClock,
        fullMoveNumber
      };
      const gameStatus = getGameStatus(gameState, isWhiteTurn ? 'white' : 'black');
      
      // Convert GameStatus object to string status
      let status: 'in-progress' | 'check' | 'checkmate' | 'stalemate' | 'draw' = 'in-progress';
      if (gameStatus.isCheckmate) status = 'checkmate';
      else if (gameStatus.isStalemate) status = 'stalemate';
      else if (gameStatus.isDraw) status = 'draw';
      else if (gameStatus.isCheck) status = 'check';
      
      dispatch(setGameStatus(status));
    }
  }, [board, isWhiteTurn, moveHistory, halfMoveClock, fullMoveNumber, dispatch]);

  const handleSquareClick = (row: number, col: number) => {
    const clickedPiece = board[row][col];
  
    if (clickedPiece && clickedPiece.color === (isWhiteTurn ? 'white' : 'black')) {
      dispatch(selectPiece({ row, col }));
      return;
    }
  
    if (selectedPiece) {
      const piece = board[selectedPiece.row][selectedPiece.col];
      if (piece && isValidMove(selectedPiece, { row, col }, board, piece)) {
        const targetPiece = board[row][col];
        console.log("Trying move", selectedPiece, "->", { row, col }, "Is valid:", isValidMove(selectedPiece, { row, col }, board, piece));
        
        // Create new board state with the move applied
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = piece;
        newBoard[selectedPiece.row][selectedPiece.col] = null;
        
        dispatch(movePiece({
          from: selectedPiece,
          to: { row, col },
          piece,
          capturedPiece: targetPiece,
          board: newBoard
        }));
      }
  
      // ✅ Deselect by setting null
      dispatch(selectPiece(null));
    }
  };
  

  const handleTouchStart = (row: number, col: number, e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setTouches(prev => ({
      ...prev,
      [touch.identifier]: {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
        row,
        col
      }
    }));
  };

  const handleTouchEnd = (row: number, col: number, e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    const data = touches[touch.identifier];
    if (data && Date.now() - data.timestamp < 300) {
      handleSquareClick(row, col);
    }
    setTouches(prev => {
      const copy = { ...prev };
      delete copy[touch.identifier];
      return copy;
    });
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (selectedPiece) {
      const piece = board[selectedPiece.row][selectedPiece.col];
      if (piece && isValidMove(selectedPiece, { row, col }, board, piece)) {
        dispatch(setHoverPosition({ row, col }));
      }
    }
  };
  const handleMouseLeave = () => {
    dispatch(setHoverPosition(null));
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    const r = selectedPiece?.row ?? 0;
    const c = selectedPiece?.col ?? 0;
    let newRow = r, newCol = c;

    switch (e.key) {
      case 'ArrowUp': newRow = Math.max(0, r - 1); break;
      case 'ArrowDown': newRow = Math.min(7, r + 1); break;
      case 'ArrowLeft': newCol = Math.max(0, c - 1); break;
      case 'ArrowRight': newCol = Math.min(7, c + 1); break;
      case 'Enter':
        if (selectedPiece) {
          const piece = board[r][c];
          if (piece && isValidMove(selectedPiece, { row: newRow, col: newCol }, board, piece)) {
            const target = board[newRow][newCol];
            dispatch(movePiece({
              from: selectedPiece,
              to: { row: newRow, col: newCol },
              piece,
              capturedPiece: target,
              board: chessState.board
            }));
            dispatch(selectPiece({ row: -1, col: -1 }));
          }
        }
        break;
      case 'Escape':
        dispatch(selectPiece({ row: -1, col: -1 }));
        break;
    }

    if ((newRow !== r || newCol !== c) && board[newRow][newCol]?.color === (isWhiteTurn ? 'white' : 'black')) {
      dispatch(selectPiece({ row: newRow, col: newCol }));
      dispatch(setHoverPosition({ row: newRow, col: newCol }));
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPiece, board]);

  const getStatusText = () => {
    switch (gameStatus) {
      case 'check': return 'Check!';
      case 'checkmate': return 'Checkmate!';
      case 'stalemate': return 'Stalemate!';
      case 'draw': return 'Draw!';
      default: return '';
    }
  };

  const suggestedSquares = React.useMemo(() => {
    if (!selectedPiece) return [];
    const piece = board[selectedPiece.row][selectedPiece.col];
    if (!piece) return [];
    
    return getSuggestedMoves(selectedPiece, board, piece);
  }, [selectedPiece, board]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.chessboard}>
        <h2 className={styles['chessboard__header__h2']}>Take a break and play Chess Game</h2>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2,
          mb: 2
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(resetBoard())}
            sx={{
              textTransform: 'none',
              borderRadius: '25px',
              padding: '0.75rem 2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Reset Game
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(undoMove())}
            disabled={moveHistory.length === 0}
            sx={{
              textTransform: 'none',
              borderRadius: '25px',
              padding: '0.75rem 2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Undo Move
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const lastMove = moveHistory[moveHistory.length - 2];
              if (lastMove) {
                dispatch(setBoard(lastMove.board));
                dispatch({ type: 'chess/setIsWhiteTurn', payload: !isWhiteTurn });
              }
            }}
            disabled={moveHistory.length < 2}
            sx={{
              textTransform: 'none',
              borderRadius: '25px',
              padding: '0.75rem 2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Redo Move
          </Button>
        </Box>


        <div className={styles['chessboard__board']}>
          {board.map((row, rowIndex) => (
            <Row
              key={rowIndex}
              rowIndex={rowIndex}
              board={board}
              selectedPiece={selectedPiece}
              handleSquareClick={handleSquareClick}
              onMouseEnter={(row: number, col: number) => handleMouseEnter(row, col)}
              onMouseLeave={handleMouseLeave}
              handleSquareDoubleClick={handleSquareClick} 
              handleTouchStart={handleTouchStart}
              handleTouchEnd={handleTouchEnd}
              hoverPosition={hoverPosition}
              isWhiteTurn={isWhiteTurn}
              suggestedMoves={suggestedSquares} 
              setHoverPosition={(position: SelectedPiecePosition | null) => dispatch(setHoverPosition(position))}      
                    />
          ))}
        </div>

       
        <div className={styles['chessboard__status']}>
          {isWhiteTurn ? 'White to move' : 'Black to move'} | {getStatusText()}
        </div>
      </div>
    </DndProvider>
  );
};

export default ChessBoard;