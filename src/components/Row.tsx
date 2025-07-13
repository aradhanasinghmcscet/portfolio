import React from 'react';
import { SelectedPiecePosition, ChessPiece } from '../store/chessSlice';
import styles from '../styles/components/chessboard.module.scss';
import { isValidMove } from '../utils/chessRules';

interface RowProps {
  rowIndex: number;
  selectedPiece: SelectedPiecePosition | null;
  handleSquareClick: (row: number, col: number) => void;
  handleSquareDoubleClick: (row: number, col: number) => void;
  handleTouchStart: (row: number, col: number, e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (row: number, col: number, e: React.TouchEvent<HTMLDivElement>) => void;
  setHoverPosition: (position: SelectedPiecePosition | null) => void;
  hoverPosition: SelectedPiecePosition | null;
  board: (ChessPiece | null)[][];
  isWhiteTurn: boolean;
}

const Row: React.FC<RowProps> = ({
  rowIndex,
  selectedPiece,
  handleSquareClick,
  handleSquareDoubleClick,
  handleTouchStart,
  handleTouchEnd,
  setHoverPosition,
  hoverPosition,
  board,
  isWhiteTurn
}) => {
  return (
    <div className={styles['chessboard__row']}>
      {board[rowIndex].map((piece, colIndex) => {
        const isHovered = hoverPosition?.row === rowIndex && hoverPosition?.col === colIndex;
        const isDarkSquare = (rowIndex + colIndex) % 2 === 1;
        const isTargetSquare = selectedPiece && board[selectedPiece.row]?.[selectedPiece.col] && isValidMove(selectedPiece, { row: rowIndex, col: colIndex }, board, board[selectedPiece.row][selectedPiece.col]!);
        const squareClasses = `${styles['chessboard__square']} ${
          isDarkSquare ? styles['chessboard__square--dark'] : styles['chessboard__square--light']
        } ${
          isHovered ? styles['chessboard__square--hovered'] : ''
        } ${
          selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex ? styles['chessboard__square--selected'] : ''
        } ${
          isTargetSquare ? styles['chessboard__square--valid-move'] : ''
        }`;

        return (
          <div
            key={colIndex}
            className={squareClasses}
            onClick={(e) => handleSquareClick(rowIndex, colIndex)}
            onDoubleClick={(e) => handleSquareDoubleClick(rowIndex, colIndex)}
            onTouchStart={(e) => handleTouchStart(rowIndex, colIndex, e)}
            onTouchEnd={(e) => handleTouchEnd(rowIndex, colIndex, e)}
            tabIndex={0}
            onMouseEnter={(e) => setHoverPosition({ row: rowIndex, col: colIndex })}
            onMouseLeave={(e) => setHoverPosition(null)}
            style={{
              flex: 1,
              aspectRatio: '1'
            }}
          >
            {piece && (
              <div className={`${styles['chessboard__piece']} ${styles[`chessboard__piece--${piece.color}-${piece.type}`]}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Row;
