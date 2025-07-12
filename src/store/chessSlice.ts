import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChessPosition } from '../types/chess';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  unicode: string;
  hasMoved: boolean;
}

export interface SelectedPiecePosition {
  row: number;
  col: number;
}

export interface Move {
  from: SelectedPiecePosition;
  to: SelectedPiecePosition;
  piece: ChessPiece;
  capturedPiece: ChessPiece | null;
}

export interface ChessState {
  board: (ChessPiece | null)[][];
  selectedPiece: SelectedPiecePosition | null;
  hoverPosition: SelectedPiecePosition | null;
  isWhiteTurn: boolean;
  moveHistory: Move[];
  gameStatus: 'in-progress' | 'check' | 'checkmate' | 'stalemate';
  capturedPieces: {
    white: ChessPiece[];
    black: ChessPiece[];
  };
}

export const initialState: ChessState = {
  board: [
    // Initial chess board setup
    [
      { type: 'rook', color: 'black', unicode: '♜', hasMoved: false },
      { type: 'knight', color: 'black', unicode: '♞', hasMoved: false },
      { type: 'bishop', color: 'black', unicode: '♝', hasMoved: false },
      { type: 'queen', color: 'black', unicode: '♛', hasMoved: false },
      { type: 'king', color: 'black', unicode: '♚', hasMoved: false },
      { type: 'bishop', color: 'black', unicode: '♝', hasMoved: false },
      { type: 'knight', color: 'black', unicode: '♞', hasMoved: false },
      { type: 'rook', color: 'black', unicode: '♜', hasMoved: false }
    ],
    [
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false },
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false },
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false },
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false },
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false },
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false },
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false },
      { type: 'pawn', color: 'black', unicode: '♟', hasMoved: false }
    ],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    [
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false },
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false },
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false },
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false },
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false },
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false },
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false },
      { type: 'pawn', color: 'white', unicode: '♙', hasMoved: false }
    ],
    [
      { type: 'rook', color: 'white', unicode: '♖', hasMoved: false },
      { type: 'knight', color: 'white', unicode: '♘', hasMoved: false },
      { type: 'bishop', color: 'white', unicode: '♗', hasMoved: false },
      { type: 'queen', color: 'white', unicode: '♕', hasMoved: false },
      { type: 'king', color: 'white', unicode: '♔', hasMoved: false },
      { type: 'bishop', color: 'white', unicode: '♗', hasMoved: false },
      { type: 'knight', color: 'white', unicode: '♘', hasMoved: false },
      { type: 'rook', color: 'white', unicode: '♖', hasMoved: false }
    ]
  ],
  selectedPiece: null,
  hoverPosition: null,
  isWhiteTurn: true,
  moveHistory: [],
  gameStatus: 'in-progress',
  capturedPieces: {
    white: [],
    black: []
  }
};

const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<(ChessPiece | null)[][]>) => {
      state.board = action.payload;
    },

    setMoveHistory: (state, action: PayloadAction<ChessState['moveHistory']>) => {
      state.moveHistory = action.payload;
    },

    setIsWhiteTurn: (state, action: PayloadAction<boolean>) => {
      state.isWhiteTurn = action.payload;
    },

    resetBoard: (state) => {
      state.board = initialState.board;
      state.selectedPiece = initialState.selectedPiece;
      state.hoverPosition = initialState.hoverPosition;
      state.isWhiteTurn = initialState.isWhiteTurn;
      state.moveHistory = initialState.moveHistory;
      state.gameStatus = initialState.gameStatus;
    },

    undoMove: (state) => {
      if (state.moveHistory.length === 0) return;
      
      const lastMove = state.moveHistory[state.moveHistory.length - 1];
      
      // Restore piece to original position
      state.board[lastMove.from.row][lastMove.from.col] = lastMove.piece;
      
      // Remove piece from new position
      state.board[lastMove.to.row][lastMove.to.col] = lastMove.capturedPiece;
      
      // Remove last move from history
      state.moveHistory.pop();
      
      // Update turn
      state.isWhiteTurn = !state.isWhiteTurn;
    },

    initializeBoard: (state) => {
      // Initialize the board with pieces
      state.board = Array(8).fill(null).map(() => Array(8).fill(null));
      
      // Place white pieces
      state.board[0] = [
        { type: 'rook', color: 'white', unicode: '♖', hasMoved: false },
        { type: 'knight', color: 'white', unicode: '♘', hasMoved: false },
        { type: 'bishop', color: 'white', unicode: '♗', hasMoved: false },
        { type: 'queen', color: 'white', unicode: '♕', hasMoved: false },
        { type: 'king', color: 'white', unicode: '♔', hasMoved: false },
        { type: 'bishop', color: 'white', unicode: '♗', hasMoved: false },
        { type: 'knight', color: 'white', unicode: '♘', hasMoved: false },
        { type: 'rook', color: 'white', unicode: '♖', hasMoved: false }
      ];
      state.board[1] = Array(8).fill({ type: 'pawn', color: 'white', unicode: '♙', hasMoved: false });

      // Place black pieces
      state.board[7] = [
        { type: 'rook', color: 'black', unicode: '♜', hasMoved: false },
        { type: 'knight', color: 'black', unicode: '♞', hasMoved: false },
        { type: 'bishop', color: 'black', unicode: '♝', hasMoved: false },
        { type: 'queen', color: 'black', unicode: '♛', hasMoved: false },
        { type: 'king', color: 'black', unicode: '♚', hasMoved: false },
        { type: 'bishop', color: 'black', unicode: '♝', hasMoved: false },
        { type: 'knight', color: 'black', unicode: '♞', hasMoved: false },
        { type: 'rook', color: 'black', unicode: '♜', hasMoved: false }
      ];
      state.board[6] = Array(8).fill({ type: 'pawn', color: 'black', unicode: '♟', hasMoved: false });

      // Reset other state
      state.selectedPiece = null;
      state.hoverPosition = { row: 0, col: 0 };
      state.isWhiteTurn = true;
      state.moveHistory = [];
      state.gameStatus = 'in-progress';
    },

    selectPiece: (state, action: PayloadAction<ChessPosition>) => {
      state.selectedPiece = action.payload;
    },

    movePiece: (state, action: PayloadAction<Move>) => {
      const { from, to, piece, capturedPiece } = action.payload;
      
      // Remove captured piece from board first
      if (capturedPiece) {
        state.board[to.row][to.col] = null;
      }
      
      // Move the piece
      state.board[from.row][from.col] = null;
      state.board[to.row][to.col] = piece;
      
      // Track captured piece
      if (capturedPiece) {
        state.capturedPieces[capturedPiece.color].push({
          ...capturedPiece,
          hasMoved: true
        });
      }
      
      // Add to move history
      const move: Move = {
        from,
        to,
        piece,
        capturedPiece: capturedPiece || null
      };
      state.moveHistory.push(move);
      
      // Toggle turn
      state.isWhiteTurn = !state.isWhiteTurn;
      state.selectedPiece = null;
    },

    setHoverPosition(state, action: PayloadAction<ChessPosition | null>) {
      state.hoverPosition = action.payload || { row: 0, col: 0 };
    },

    setGameStatus: (state, action: PayloadAction<ChessState['gameStatus']>) => {
      state.gameStatus = action.payload;
    }
  }
});

export const {
  initializeBoard,
  selectPiece,
  movePiece,
  setHoverPosition,
  setGameStatus,
  setBoard,
  setMoveHistory,
  setIsWhiteTurn,
  resetBoard,
  undoMove
} = chessSlice.actions;

export default chessSlice.reducer;

// Export the slice name for use in other components
export const chessSliceName = chessSlice.name;
