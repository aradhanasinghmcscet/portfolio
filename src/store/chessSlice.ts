import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  unicode: string;
  hasMoved: boolean;
}

export type SelectedPiecePosition = { row: number; col: number } | null;

export interface Move {
  from: SelectedPiecePosition;
  to: SelectedPiecePosition;
  piece: ChessPiece;
  capturedPiece: ChessPiece | null;
  board: (ChessPiece | null)[][];
}

export interface ChessState {
  board: (ChessPiece | null)[][];
  selectedPiece: SelectedPiecePosition | null;
  hoverPosition: SelectedPiecePosition | null;
  isWhiteTurn: boolean;
  moveHistory: Move[];
  gameStatus: 'in-progress' | 'check' | 'checkmate' | 'stalemate' | 'draw';
  capturedPieces: {
    white: ChessPiece[];
    black: ChessPiece[];
  };
  halfMoveClock: number;       // ← ADD THIS LINE
  fullMoveNumber: number;     
}

const generateInitialBoard = (): (ChessPiece | null)[][] => {
  const emptyRow = Array(8).fill(null);
  const board = Array(8).fill(null).map(() => [...emptyRow]);

  const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  const unicodeMap: Record<PieceType, [string, string]> = {
    pawn: ['♙', '♟'],
    rook: ['♖', '♜'],
    knight: ['♘', '♞'],
    bishop: ['♗', '♝'],
    queen: ['♕', '♛'],
    king: ['♔', '♚']
  };

  // Set pieces for black
  for (let col = 0; col < 8; col++) {
    const type = pieceOrder[col];
    board[0][col] = { type, color: 'black', unicode: unicodeMap[type][1], hasMoved: false };
    board[1][col] = { type: 'pawn', color: 'black', unicode: unicodeMap['pawn'][1], hasMoved: false };
  }

  // Set pieces for white
  for (let col = 0; col < 8; col++) {
    const type = pieceOrder[col];
    board[6][col] = { type: 'pawn', color: 'white', unicode: unicodeMap['pawn'][0], hasMoved: false };
    board[7][col] = { type, color: 'white', unicode: unicodeMap[type][0], hasMoved: false };
  }

  return board;
};



const initialState: ChessState = {
  board: generateInitialBoard(),
  selectedPiece:  null,
  hoverPosition:  null,
  isWhiteTurn: true,
  moveHistory: [],
  gameStatus: 'in-progress',
  capturedPieces: {
    white: [],
    black: []
  },
  halfMoveClock: 0,
  fullMoveNumber: 1
};

const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    setHoverPosition: (state, action: PayloadAction<SelectedPiecePosition | null>) => {
      state.hoverPosition = action.payload;
    },
    setBoard: (state, action: PayloadAction<(ChessPiece | null)[][]>) => {
      state.board = action.payload;
    },
    setSelectedPiece: (state, action: PayloadAction<SelectedPiecePosition>) => {
      state.selectedPiece = action.payload;
    },    

    initializeBoard: (state) => {
      state.board = generateInitialBoard();
      state.selectedPiece = null;
      state.hoverPosition = null;
      state.isWhiteTurn = true;
      state.moveHistory = [];
      state.gameStatus = 'in-progress';
      state.capturedPieces = {
        white: [],
        black: []
      };
    },

    selectPiece: (state, action: PayloadAction<SelectedPiecePosition>) => {
      state.selectedPiece = action.payload;
    },

    movePiece: (state, action: PayloadAction<Move>) => {
      const { from, to, piece, capturedPiece, board } = action.payload;
      state.board = board;
      state.moveHistory.push({ from, to, piece, capturedPiece, board });
      if (capturedPiece) {
        state.capturedPieces[capturedPiece.color].push(capturedPiece);
      }
      state.isWhiteTurn = !state.isWhiteTurn;
      state.selectedPiece = null;
      state.hoverPosition = null;
    },

    resetBoard: (state) => {
      state.board = generateInitialBoard();
      state.selectedPiece = null;
      state.hoverPosition = null;
      state.isWhiteTurn = true;
      state.moveHistory = [];
      state.gameStatus = 'in-progress';
      state.capturedPieces = {
        white: [],
        black: []
      };
    },

    undoMove: (state) => {
      const lastMove = state.moveHistory.pop();
      if (!lastMove) return;
      state.board = lastMove.board;
      state.isWhiteTurn = !state.isWhiteTurn;
    },

    setGameStatus: (state, action: PayloadAction<ChessState['gameStatus']>) => {
      state.gameStatus = action.payload;
    }
  }
});

export const {
  setBoard,
  initializeBoard,
  setHoverPosition,
  selectPiece,
  movePiece,
  resetBoard,
  undoMove,
  setGameStatus
} = chessSlice.actions;

export default chessSlice.reducer;
export const chessSliceName = chessSlice.name;