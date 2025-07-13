import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isValidMove } from '../utils/chessRules';

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
    selectPiece: (state, action: PayloadAction<SelectedPiecePosition>) => {
      const piece = state.board[action.payload.row][action.payload.col];
      if (piece && piece.color === (state.isWhiteTurn ? 'white' : 'black')) {
        state.selectedPiece = action.payload;
        state.hoverPosition = null;
      }
    },

    movePiece: (state, action: PayloadAction<SelectedPiecePosition>) => {
      if (!state.selectedPiece) return;

      const from = state.selectedPiece;
      const to = action.payload;
      const piece = state.board[from.row][from.col];
      const targetPiece = state.board[to.row][to.col];

      if (piece && isValidMove(from, to, state.board, piece)) {
        // Store captured piece first
        const capturedPiece = targetPiece ? {
          ...targetPiece,
          hasMoved: true
        } : null;

        // Move piece
        state.board[to.row][to.col] = piece;
        state.board[from.row][from.col] = null;
        piece.hasMoved = true;

        // Update captured pieces
        if (capturedPiece) {
          state.capturedPieces[capturedPiece.color].push(capturedPiece);
        }

        // Add to move history
        state.moveHistory.push({
          from,
          to,
          piece: {
            ...piece,
            hasMoved: true
          },
          capturedPiece
        });

        // Switch turns
        state.isWhiteTurn = !state.isWhiteTurn;
        state.selectedPiece = null;
        state.hoverPosition = null;
      }
    },

    setHoverPosition: (state, action: PayloadAction<SelectedPiecePosition | null>) => {
      state.hoverPosition = action.payload;
    },

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
      const whitePieces: ChessPiece[] = [
        { type: 'rook' as const, color: 'white' as const, unicode: '♖', hasMoved: false },
        { type: 'knight' as const, color: 'white' as const, unicode: '♘', hasMoved: false },
        { type: 'bishop' as const, color: 'white' as const, unicode: '♗', hasMoved: false },
        { type: 'queen' as const, color: 'white' as const, unicode: '♕', hasMoved: false },
        { type: 'king' as const, color: 'white' as const, unicode: '♔', hasMoved: false },
        { type: 'bishop' as const, color: 'white' as const, unicode: '♗', hasMoved: false },
        { type: 'knight' as const, color: 'white' as const, unicode: '♘', hasMoved: false },
        { type: 'rook' as const, color: 'white' as const, unicode: '♖', hasMoved: false }
      ];
      
      // Place white pawns
      for (let i = 0; i < 8; i++) {
        state.board[6][i] = { type: 'pawn' as const, color: 'white' as const, unicode: '♙', hasMoved: false } as ChessPiece;
      }
      
      // Place white back row pieces
      whitePieces.forEach((piece, i) => {
        state.board[7][i] = piece;
      });
      
      // Place black pieces
      const blackPieces: ChessPiece[] = whitePieces.map(piece => ({
        ...piece,
        color: 'black' as PieceColor,
        unicode: piece.unicode.toLowerCase() as string
      }));
      
      // Place black pawns
      for (let i = 0; i < 8; i++) {
        state.board[1][i] = { type: 'pawn' as const, color: 'black' as const, unicode: '♟', hasMoved: false } as ChessPiece;
      }
      
      // Place black back row pieces
      blackPieces.forEach((piece, i) => {
        state.board[0][i] = piece;
      });
      
      // Reset other state
      state.selectedPiece = null;
      state.hoverPosition = null;
      state.isWhiteTurn = true;
      state.moveHistory = [];
      state.gameStatus = 'in-progress';
      state.capturedPieces = {
        white: [],
        black: []
      };
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
      state.board[6] = Array(8).fill({ type: 'pawn', color: 'black', unicode: '♟', hasMoved: false });
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
    }
  }
});

export const {
  selectPiece,
  movePiece,
  setHoverPosition,
  setBoard,
  setMoveHistory,
  setIsWhiteTurn,
  resetBoard,
  undoMove,
  initializeBoard
} = chessSlice.actions;

export default chessSlice.reducer;

// Export the slice name for use in other components
export const chessSliceName = chessSlice.name;
