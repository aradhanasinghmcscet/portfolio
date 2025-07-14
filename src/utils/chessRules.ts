// utils/chessRules.ts

import { ChessPiece, PieceType, PieceColor, Move } from '../store/chessSlice';

export type ChessPosition = { row: number; col: number };

export type GameStatus = {
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  reason?: string;
};

export type GameState = {
  board: (ChessPiece | null)[][];
  isWhiteTurn: boolean;
  halfMoveClock: number;
  fullMoveNumber: number;
  moveHistory: Move[];
  drawOffers?: {
    white: boolean;
    black: boolean;
  };
};

// Clone the board
const cloneBoard = (board: (ChessPiece | null)[][]): (ChessPiece | null)[][] =>
  board.map(row => row.map(cell => cell ? { ...cell } : null));

// Find the king
const findKing = (board: (ChessPiece | null)[][] | undefined, color: PieceColor): ChessPosition | null => {
  if (!board) {
    console.error('Board is undefined in findKing');
    return null;
  }
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'king' && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
};

// Check if position is on board
const inBounds = (r: number, c: number): boolean => r >= 0 && r < 8 && c >= 0 && c < 8;

// Piece movement logic
const pieceMovement = {
  pawn(from: ChessPosition, to: ChessPosition, board: (ChessPiece | null)[][], piece: ChessPiece): boolean {
    // Prevent out-of-bounds moves
    if (to.row < 0 || to.row >= 8) return false;
    
    const dir = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;
    const diffRow = to.row - from.row;
    const diffCol = to.col - from.col;
    const target = board[to.row][to.col];

    if (diffCol === 0 && diffRow === dir && !target) return true;

    if (diffCol === 0 && diffRow === dir * 2 && from.row === startRow &&
        !board[from.row + dir][from.col] && !target) return true;

    if (Math.abs(diffCol) === 1 && diffRow === dir && target && target.color !== piece.color) return true;

    return false; // En passant not handled here
  },

  knight(from: ChessPosition, to: ChessPosition): boolean {
    const dr = Math.abs(from.row - to.row);
    const dc = Math.abs(from.col - to.col);
    return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
  },

  bishop(from: ChessPosition, to: ChessPosition, board: (ChessPiece | null)[][]): boolean {
    const dr = to.row - from.row;
    const dc = to.col - from.col;
    if (Math.abs(dr) !== Math.abs(dc)) return false;

    const stepR = dr > 0 ? 1 : -1;
    const stepC = dc > 0 ? 1 : -1;

    for (let i = 1; i < Math.abs(dr); i++) {
      if (board[from.row + i * stepR][from.col + i * stepC]) return false;
    }
    return true;
  },

  rook(from: ChessPosition, to: ChessPosition, board: (ChessPiece | null)[][]): boolean {
    if (from.row !== to.row && from.col !== to.col) return false;

    const stepR = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
    const stepC = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);

    let r = from.row + stepR;
    let c = from.col + stepC;

    while (r !== to.row || c !== to.col) {
      if (board[r][c]) return false;
      r += stepR;
      c += stepC;
    }

    return true;
  },

  queen(from: ChessPosition, to: ChessPosition, board: (ChessPiece | null)[][]): boolean {
    return (
      pieceMovement.bishop(from, to, board) ||
      pieceMovement.rook(from, to, board)
    );
  },

  king(from: ChessPosition, to: ChessPosition): boolean {
    return Math.abs(from.row - to.row) <= 1 && Math.abs(from.col - to.col) <= 1;
  }
};

// Determine if a move is valid
export const getSuggestedMoves = (from: ChessPosition, board: (ChessPiece | null)[][], piece: ChessPiece): ChessPosition[] => {
  const moves: ChessPosition[] = [];
  
  // Generate all possible moves
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (isValidMove(from, { row: r, col: c }, board, piece)) {
        moves.push({ row: r, col: c });
      }
    }
  }
  
  return moves;
};

export const isValidMove = (
  from: ChessPosition,
  to: ChessPosition,
  board: (ChessPiece | null)[][],
  piece: ChessPiece,
  skipCheckTest: boolean = false
): boolean => {
  if (!inBounds(to.row, to.col)) return false;
  if (from.row === to.row && from.col === to.col) return false;

  const target = board[to.row][to.col];
  if (target && target.color === piece.color) return false;

  const movementFn = pieceMovement[piece.type];
  if (!movementFn) return false;

  if (!movementFn(from, to, board, piece)) return false;

  if (skipCheckTest) return true;

  // Check for self-check
  const testBoard = cloneBoard(board);
  testBoard[to.row][to.col] = { ...piece, hasMoved: true };
  testBoard[from.row][from.col] = null;

  const kingPos = findKing(testBoard, piece.color);
  if (!kingPos) return false;

  return !isKingUnderAttack(testBoard, kingPos, piece.color === 'white' ? 'black' : 'white');
};

// Determine if the king is under attack
const isKingUnderAttack = (
  board: (ChessPiece | null)[][],
  kingPos: ChessPosition,
  attackerColor: PieceColor
): boolean => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const enemy = board[r][c];
      if (enemy && enemy.color === attackerColor) {
        if (isValidMove({ row: r, col: c }, kingPos, board, enemy, true)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Determine full game status
export const getGameStatus = (gameState: GameState, currentColor: PieceColor): GameStatus => {
  const { board } = gameState;
  const kingPos = findKing(board, currentColor);
  const enemyColor = currentColor === 'white' ? 'black' : 'white';

  const isCheck = kingPos ? isKingUnderAttack(board, kingPos, enemyColor) : false;
  let hasLegalMoves = false;

  for (let r1 = 0; r1 < 8; r1++) {
    for (let c1 = 0; c1 < 8; c1++) {
      const piece = board[r1][c1];
      if (!piece || piece.color !== currentColor) continue;

      for (let r2 = 0; r2 < 8; r2++) {
        for (let c2 = 0; c2 < 8; c2++) {
          if (isValidMove({ row: r1, col: c1 }, { row: r2, col: c2 }, board, piece)) {
            hasLegalMoves = true;
            break;
          }
        }
        if (hasLegalMoves) break;
      }
    }
  }

  if (!hasLegalMoves) {
    return {
      isCheck,
      isCheckmate: isCheck,
      isStalemate: !isCheck,
      isDraw: !isCheck,
      reason: isCheck ? 'Checkmate' : 'Stalemate'
    };
  }

  return {
    isCheck,
    isCheckmate: false,
    isStalemate: false,
    isDraw: false
  };
};
