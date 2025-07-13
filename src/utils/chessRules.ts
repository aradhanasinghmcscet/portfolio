import { ChessPiece, PieceType, PieceColor } from '../store/chessSlice';

export type ChessPosition = {
  row: number;
  col: number;
};

export type { ChessPiece, PieceType, PieceColor };

export const isValidMove = (from: ChessPosition, to: ChessPosition, board: (ChessPiece | null)[][], piece: ChessPiece): boolean => {
  // Basic validation
  if (from.row < 0 || from.row > 7 || from.col < 0 || from.col > 7) return false;
  if (to.row < 0 || to.row > 7 || to.col < 0 || to.col > 7) return false;
  
  // Check if piece exists at from position
  const fromPiece = board[from.row]?.[from.col];
  if (!fromPiece || fromPiece.color !== piece.color) return false;

  // Get the piece at destination
  const destPiece = board[to.row]?.[to.col];
  
  // Cannot capture own piece
  if (destPiece && destPiece.color === piece.color) return false;

  // Calculate row and column differences
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);

  // Check piece-specific movement rules
  switch (piece.type) {
    case 'pawn':
      // Pawns can move forward one square, or two on their first move (non-capturing)
      if (piece.color === 'white') {
        // Non-capturing move
        if (to.col === from.col) {
          return (from.row === 6 ? (to.row === from.row - 1 || to.row === from.row - 2) : to.row === from.row - 1) && !board[to.row][to.col];
        }
        // Capturing move
        return to.row === from.row - 1 && (to.col === from.col - 1 || to.col === from.col + 1) && board[to.row][to.col]?.color === 'black';
      } else {
        // Non-capturing move
        if (to.col === from.col) {
          return (from.row === 1 ? (to.row === from.row + 1 || to.row === from.row + 2) : to.row === from.row + 1) && !board[to.row][to.col];
        }
        // Capturing move
        return to.row === from.row + 1 && (to.col === from.col - 1 || to.col === from.col + 1) && board[to.row][to.col]?.color === 'white';
      }
    case 'rook':
      // Rook can move horizontally or vertically
      if (rowDiff === 0 || colDiff === 0) {
        // Check if path is clear
        const step = to.row > from.row ? 1 : -1;
        
        for (let i = 1; i < Math.abs(to.row - from.row); i++) {
          if (board[from.row + i * step][from.col]) return false;
        }
        return true;
      }
      return false;

    case 'knight':
      // Knight moves in L-shape
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

    case 'bishop':
      // Bishop moves diagonally
      if (rowDiff === colDiff) {
        // Check if path is clear
        const step = to.row > from.row ? 1 : -1;
        for (let i = 1; i < rowDiff; i++) {
          const row = from.row + i * step;
          const col = from.col + i * step;
          if (board[row][col]) return false;
        }
        return true;
      }
      return false;

    case 'queen':
      // Queen can move horizontally, vertically, or diagonally
      if (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) {
        // Check if path is clear
        const direction = rowDiff === colDiff ? 'diagonal' : rowDiff === 0 ? 'horizontal' : 'vertical';
        const step = to.row > from.row || to.col > from.col ? 1 : -1;
        
        for (let i = 1; i < Math.max(rowDiff, colDiff); i++) {
          const row = direction === 'horizontal' ? from.row : from.row + i * step;
          const col = direction === 'vertical' ? from.col : from.col + i * step;
          if (board[row][col]) return false;
        }
        return true;
      }
      return false;

    case 'king':
      // King can move one square in any direction
      return rowDiff <= 1 && colDiff <= 1;
    default:
      return false;
  }
};
