import { useState, useEffect, useCallback, useRef } from 'react';
import './Chess.css';

// Chess piece type definition
type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';

interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean;
}

// Chess board type definition
type ChessBoard = (ChessPiece | null)[][];

// Position type definition
interface Position {
  row: number;
  col: number;
}

// Move definition for Stockfish
interface ChessMove {
  from: string;
  to: string;
  promotion?: string;
}

interface ChessGameProps {
  onBackToDetails?: () => void;
}

const Chess = ({ onBackToDetails }: ChessGameProps) => {
  // Game state
  const [board, setBoard] = useState<ChessBoard>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [message, setMessage] = useState<string>('Your turn (White)');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [capturedPieces, setCapturedPieces] = useState<{ white: ChessPiece[], black: ChessPiece[] }>({
    white: [],
    black: []
  });
  const [thinking, setThinking] = useState<boolean>(false);
  
  // Ref for stockfish worker
  const stockfishRef = useRef<Worker | null>(null);
  const gameHistoryRef = useRef<string[]>([]);

  // Initialize the chess board
  const initializeBoard = useCallback(() => {
    const newBoard: ChessBoard = Array(8).fill(null).map(() => Array(8).fill(null));

    // Add pawns
    for (let col = 0; col < 8; col++) {
      newBoard[1][col] = { type: 'pawn', color: 'black' };
      newBoard[6][col] = { type: 'pawn', color: 'white' };
    }

    // Add rooks
    newBoard[0][0] = { type: 'rook', color: 'black' };
    newBoard[0][7] = { type: 'rook', color: 'black' };
    newBoard[7][0] = { type: 'rook', color: 'white' };
    newBoard[7][7] = { type: 'rook', color: 'white' };

    // Add knights
    newBoard[0][1] = { type: 'knight', color: 'black' };
    newBoard[0][6] = { type: 'knight', color: 'black' };
    newBoard[7][1] = { type: 'knight', color: 'white' };
    newBoard[7][6] = { type: 'knight', color: 'white' };

    // Add bishops
    newBoard[0][2] = { type: 'bishop', color: 'black' };
    newBoard[0][5] = { type: 'bishop', color: 'black' };
    newBoard[7][2] = { type: 'bishop', color: 'white' };
    newBoard[7][5] = { type: 'bishop', color: 'white' };

    // Add queens
    newBoard[0][3] = { type: 'queen', color: 'black' };
    newBoard[7][3] = { type: 'queen', color: 'white' };

    // Add kings
    newBoard[0][4] = { type: 'king', color: 'black', hasMoved: false };
    newBoard[7][4] = { type: 'king', color: 'white', hasMoved: false };

    return newBoard;
  }, []);

  // Initialize Stockfish
  useEffect(() => {
    // For now, we'll use a mock implementation since we can't load a real Stockfish worker
    // In a real implementation, you would:
    // stockfishRef.current = new Worker('/path/to/stockfish.js');
    
    // Mock implementation
    stockfishRef.current = {
      postMessage: (msg: string) => {
        console.log('Stockfish command:', msg);
        
        // After a delay, simulate Stockfish's response
        if (msg.startsWith('position') && msg.includes('moves')) {
          setTimeout(() => {
            makeStockfishMove();
          }, 1000);
        }
      },
      onmessage: (e: { data: string }) => {
        // Handle Stockfish responses
        console.log('Stockfish response:', e.data);
      },
      terminate: () => {
        console.log('Stockfish terminated');
      }
    } as unknown as Worker;

    return () => {
      if (stockfishRef.current) {
        stockfishRef.current.terminate();
      }
    };
  }, []);

  // Initialize the game
  useEffect(() => {
    setBoard(initializeBoard());
    setCurrentPlayer('white');
    setMessage('Your turn (White)');
    setGameOver(false);
    setCapturedPieces({ white: [], black: [] });
    gameHistoryRef.current = [];
  }, [initializeBoard]);

  // Convert board position to algebraic notation
  const positionToAlgebraic = (pos: Position): string => {
    const file = String.fromCharCode(97 + pos.col); // 'a' to 'h'
    const rank = 8 - pos.row; // 1 to 8
    return `${file}${rank}`;
  };

  // Convert algebraic notation to board position
  const algebraicToPosition = (algebraic: string): Position => {
    const file = algebraic.charCodeAt(0) - 97; // 'a' to 'h' -> 0 to 7
    const rank = 8 - parseInt(algebraic[1]); // 1 to 8 -> 7 to 0
    return { row: rank, col: file };
  };

  // Simulate Stockfish making a move
  const makeStockfishMove = () => {
    if (gameOver || currentPlayer === 'white') return;
    
    setThinking(true);
    
    // In a real implementation, you would get the best move from Stockfish
    // Here we'll just make a simple "AI" that picks a random valid move
    setTimeout(() => {
      const aiMoves: { from: Position, to: Position }[] = [];
      
      // Find all possible moves for black pieces
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (piece && piece.color === 'black') {
            const from = { row, col };
            const moves = getLegalMoves(from, board);
            
            moves.forEach(to => {
              aiMoves.push({ from, to });
            });
          }
        }
      }
      
      if (aiMoves.length === 0) {
        // No legal moves - checkmate or stalemate
        const isCheck = isKingInCheck(board, 'black');
        if (isCheck) {
          setMessage('Checkmate! You win!');
        } else {
          setMessage('Stalemate! Game is a draw.');
        }
        setGameOver(true);
        setThinking(false);
        return;
      }
      
      // Pick a random move
      const randomMove = aiMoves[Math.floor(Math.random() * aiMoves.length)];
      
      // Make the move
      executeMove(randomMove.from, randomMove.to);
      
      setThinking(false);
    }, 1000);
  };

  // Get possible moves for a piece
  const getPossibleMoves = (position: Position, board: ChessBoard): Position[] => {
    const { row, col } = position;
    const piece = board[row][col];
    
    if (!piece) return [];
    
    const moves: Position[] = [];
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Move forward one step
        if (row + direction >= 0 && row + direction < 8 && !board[row + direction][col]) {
          moves.push({ row: row + direction, col });
          
          // Move forward two steps from starting position
          if (row === startRow && !board[row + 2 * direction][col]) {
            moves.push({ row: row + 2 * direction, col });
          }
        }
        
        // Capture diagonally
        const captureCols = [col - 1, col + 1];
        for (const captureCol of captureCols) {
          if (
            captureCol >= 0 && 
            captureCol < 8 && 
            row + direction >= 0 && 
            row + direction < 8 && 
            board[row + direction][captureCol] && 
            board[row + direction][captureCol]?.color !== piece.color
          ) {
            moves.push({ row: row + direction, col: captureCol });
          }
        }
        break;
        
      case 'rook':
        // Move horizontally and vertically
        const rookDirections = [
          { rowDir: -1, colDir: 0 }, // Up
          { rowDir: 1, colDir: 0 },  // Down
          { rowDir: 0, colDir: -1 }, // Left
          { rowDir: 0, colDir: 1 }   // Right
        ];
        
        for (const dir of rookDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + i * dir.rowDir;
            const newCol = col + i * dir.colDir;
            
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            if (!board[newRow][newCol]) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (board[newRow][newCol]?.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        }
        break;
        
      case 'knight':
        // Knight moves in an L shape
        const knightMoves = [
          { row: row - 2, col: col - 1 },
          { row: row - 2, col: col + 1 },
          { row: row - 1, col: col - 2 },
          { row: row - 1, col: col + 2 },
          { row: row + 1, col: col - 2 },
          { row: row + 1, col: col + 2 },
          { row: row + 2, col: col - 1 },
          { row: row + 2, col: col + 1 }
        ];
        
        for (const move of knightMoves) {
          if (
            move.row >= 0 && move.row < 8 && 
            move.col >= 0 && move.col < 8 && 
            (!board[move.row][move.col] || board[move.row][move.col]?.color !== piece.color)
          ) {
            moves.push(move);
          }
        }
        break;
        
      case 'bishop':
        // Move diagonally
        const bishopDirections = [
          { rowDir: -1, colDir: -1 }, // Up-Left
          { rowDir: -1, colDir: 1 },  // Up-Right
          { rowDir: 1, colDir: -1 },  // Down-Left
          { rowDir: 1, colDir: 1 }    // Down-Right
        ];
        
        for (const dir of bishopDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + i * dir.rowDir;
            const newCol = col + i * dir.colDir;
            
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            if (!board[newRow][newCol]) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (board[newRow][newCol]?.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        }
        break;
        
      case 'queen':
        // Combine rook and bishop moves
        const queenDirections = [
          { rowDir: -1, colDir: 0 },  // Up
          { rowDir: 1, colDir: 0 },   // Down
          { rowDir: 0, colDir: -1 },  // Left
          { rowDir: 0, colDir: 1 },   // Right
          { rowDir: -1, colDir: -1 }, // Up-Left
          { rowDir: -1, colDir: 1 },  // Up-Right
          { rowDir: 1, colDir: -1 },  // Down-Left
          { rowDir: 1, colDir: 1 }    // Down-Right
        ];
        
        for (const dir of queenDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + i * dir.rowDir;
            const newCol = col + i * dir.colDir;
            
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            if (!board[newRow][newCol]) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (board[newRow][newCol]?.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        }
        break;
        
      case 'king':
        // King moves one square in any direction
        const kingMoves = [
          { row: row - 1, col: col - 1 },
          { row: row - 1, col: col },
          { row: row - 1, col: col + 1 },
          { row: row, col: col - 1 },
          { row: row, col: col + 1 },
          { row: row + 1, col: col - 1 },
          { row: row + 1, col: col },
          { row: row + 1, col: col + 1 }
        ];
        
        for (const move of kingMoves) {
          if (
            move.row >= 0 && move.row < 8 && 
            move.col >= 0 && move.col < 8 && 
            (!board[move.row][move.col] || board[move.row][move.col]?.color !== piece.color)
          ) {
            moves.push(move);
          }
        }
        
        // Castling
        if (!piece.hasMoved) {
          // Kingside castling
          if (
            board[row][7] && 
            board[row][7].type === 'rook' && 
            board[row][7].color === piece.color && 
            !board[row][5] && 
            !board[row][6]
          ) {
            moves.push({ row, col: col + 2 });
          }
          
          // Queenside castling
          if (
            board[row][0] && 
            board[row][0].type === 'rook' && 
            board[row][0].color === piece.color && 
            !board[row][1] && 
            !board[row][2] && 
            !board[row][3]
          ) {
            moves.push({ row, col: col - 2 });
          }
        }
        break;
    }
    
    return moves;
  };

  // Get legal moves (those that don't put the king in check)
  const getLegalMoves = (position: Position, board: ChessBoard): Position[] => {
    const piece = board[position.row][position.col];
    if (!piece) return [];
    
    const possibleMoves = getPossibleMoves(position, board);
    const legalMoves: Position[] = [];
    
    // For each possible move, check if it would put our king in check
    for (const move of possibleMoves) {
      // Create a new board with the move applied
      const newBoard = simulateMove(board, position, move);
      
      // If this move doesn't put our king in check, it's legal
      if (!isKingInCheck(newBoard, piece.color)) {
        legalMoves.push(move);
      }
    }
    
    return legalMoves;
  };

  // Simulate a move without modifying the original board
  const simulateMove = (board: ChessBoard, from: Position, to: Position): ChessBoard => {
    const newBoard = board.map(row => [...row]);
    const piece = { ...newBoard[from.row][from.col] } as ChessPiece;
    
    // Move the piece
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;
    
    return newBoard;
  };

  // Check if king is in check
  const isKingInCheck = (board: ChessBoard, color: PieceColor): boolean => {
    // Find the king
    let kingPosition: Position | null = null;
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === 'king' && piece.color === color) {
          kingPosition = { row, col };
          break;
        }
      }
      if (kingPosition) break;
    }
    
    if (!kingPosition) return false; // Should never happen in a valid game
    
    // Check if any opponent piece can capture the king
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color !== color) {
          const moves = getPossibleMoves({ row, col }, board);
          if (moves.some(move => move.row === kingPosition!.row && move.col === kingPosition!.col)) {
            return true;
          }
        }
      }
    }
    
    return false;
  };

  // Execute a move on the board
  const executeMove = (from: Position, to: Position) => {
    // Create a new board
    const newBoard = [...board.map(row => [...row])];
    const piece = newBoard[from.row][from.col];
    
    if (!piece) return;
    
    // If capturing a piece, add it to captured pieces
    if (newBoard[to.row][to.col]) {
      const capturedPiece = newBoard[to.row][to.col] as ChessPiece;
      setCapturedPieces(prev => ({
        ...prev,
        [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece]
      }));
    }
    
    // Update hasMoved flag for kings and rooks
    if (piece.type === 'king' || piece.type === 'rook') {
      piece.hasMoved = true;
    }
    
    // Move the piece
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;
    
    // Handle special moves
    // Pawn promotion (simplified - always promote to queen)
    if (piece.type === 'pawn' && (to.row === 0 || to.row === 7)) {
      newBoard[to.row][to.col] = { type: 'queen', color: piece.color };
    }
    
    // Castling
    if (piece.type === 'king' && Math.abs(to.col - from.col) === 2) {
      const rookCol = to.col > from.col ? 7 : 0;
      const newRookCol = to.col > from.col ? to.col - 1 : to.col + 1;
      
      // Move the rook
      newBoard[to.row][newRookCol] = newBoard[to.row][rookCol];
      newBoard[to.row][rookCol] = null;
    }
    
    // Update game history
    const moveNotation = `${positionToAlgebraic(from)}${positionToAlgebraic(to)}`;
    gameHistoryRef.current.push(moveNotation);
    
    // Update the board
    setBoard(newBoard);
    
    // Switch player
    const nextPlayer = piece.color === 'white' ? 'black' : 'white';
    setCurrentPlayer(nextPlayer);
    
    // Update message
    if (nextPlayer === 'white') {
      setMessage('Your turn (White)');
    } else {
      setMessage('Computer thinking...');
      
      // Trigger computer move
      if (stockfishRef.current) {
        stockfishRef.current.postMessage(`position startpos moves ${gameHistoryRef.current.join(' ')}`);
        stockfishRef.current.postMessage('go depth 10');
      }
    }
    
    // Check for checkmate or stalemate
    const hasValidMoves = checkForValidMoves(newBoard, nextPlayer);
    if (!hasValidMoves) {
      const isCheck = isKingInCheck(newBoard, nextPlayer);
      if (isCheck) {
        setMessage(`Checkmate! ${piece.color === 'white' ? 'You win!' : 'Computer wins!'}`);
      } else {
        setMessage('Stalemate! Game is a draw.');
      }
      setGameOver(true);
    }
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (gameOver || currentPlayer !== 'white' || thinking) return;
    
    const clickedPiece = board[row][col];
    
    // If no piece is selected and clicked on an empty cell, do nothing
    if (!selectedPosition && !clickedPiece) return;
    
    // If no piece is selected and clicked on a piece
    if (!selectedPosition && clickedPiece) {
      // Only allow selecting white pieces (player's pieces)
      if (clickedPiece.color !== 'white') return;
      
      const moves = getLegalMoves({ row, col }, board);
      setSelectedPosition({ row, col });
      setPossibleMoves(moves);
      return;
    }
    
    // If a piece is already selected
    if (selectedPosition) {
      // If clicking on the same piece, deselect it
      if (row === selectedPosition.row && col === selectedPosition.col) {
        setSelectedPosition(null);
        setPossibleMoves([]);
        return;
      }
      
      // If clicking on another white piece, select that piece instead
      if (clickedPiece && clickedPiece.color === 'white') {
        const moves = getLegalMoves({ row, col }, board);
        setSelectedPosition({ row, col });
        setPossibleMoves(moves);
        return;
      }
      
      // Check if the move is valid
      const isValidMove = possibleMoves.some(move => move.row === row && move.col === col);
      
      if (isValidMove) {
        // Execute the move
        executeMove(selectedPosition, { row, col });
        setSelectedPosition(null);
        setPossibleMoves([]);
      }
    }
  };

  // Check if player has any valid moves
  const checkForValidMoves = (board: ChessBoard, color: PieceColor): boolean => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === color) {
          const moves = getLegalMoves({ row, col }, board);
          if (moves.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(initializeBoard());
    setSelectedPosition(null);
    setPossibleMoves([]);
    setCurrentPlayer('white');
    setMessage('Your turn (White)');
    setGameOver(false);
    setCapturedPieces({ white: [], black: [] });
    gameHistoryRef.current = [];
  };

  // Get piece Unicode symbol
  const getPieceSymbol = (piece: ChessPiece | null): string => {
    if (!piece) return '';
    
    const symbols: Record<PieceType, Record<PieceColor, string>> = {
      king: { white: '♔', black: '♚' },
      queen: { white: '♕', black: '♛' },
      rook: { white: '♖', black: '♜' },
      bishop: { white: '♗', black: '♝' },
      knight: { white: '♘', black: '♞' },
      pawn: { white: '♙', black: '♟' }
    };
    
    return symbols[piece.type][piece.color];
  };

  // Render the chess board
  return (
    <div className="chess-game">
      <div className="chess-header">
        <h2>Chess</h2>
        <div className="chess-controls">
          <button className="chess-button" onClick={resetGame}>Reset Game</button>
          {onBackToDetails && (
            <button className="chess-button" onClick={onBackToDetails}>Back to Details</button>
          )}
        </div>
      </div>
      
      <div className="chess-status">
        <div className="chess-message">
          {thinking ? 'Computer thinking...' : message}
        </div>
        {thinking && <div className="thinking-indicator"></div>}
      </div>
      
      <div className="chess-board-container">
        <div className="chess-captured-pieces">
          <div className="captured-pieces-section">
            <div className="captured-label">Black captured:</div>
            <div className="captured-pieces-list">
              {capturedPieces.white.map((piece, index) => (
                <span key={index} className="captured-piece">
                  {getPieceSymbol(piece)}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="chess-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="chess-row">
              {row.map((piece, colIndex) => {
                const isSelected = selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;
                const isPossibleMove = possibleMoves.some(move => move.row === rowIndex && move.col === colIndex);
                const cellColor = (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark';
                
                return (
                  <div 
                    key={colIndex} 
                    className={`chess-cell ${cellColor} ${isSelected ? 'selected' : ''} ${isPossibleMove ? 'possible-move' : ''}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {piece && (
                      <div className={`chess-piece ${piece.color}`}>
                        {getPieceSymbol(piece)}
                      </div>
                    )}
                    {isPossibleMove && !piece && <div className="move-indicator"></div>}
                    {isPossibleMove && piece && <div className="capture-indicator"></div>}
                    
                    {/* Cell coordinates (for reference) */}
                    {rowIndex === 7 && (
                      <div className="cell-coordinate col-coordinate">
                        {String.fromCharCode(97 + colIndex)}
                      </div>
                    )}
                    {colIndex === 0 && (
                      <div className="cell-coordinate row-coordinate">
                        {8 - rowIndex}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="chess-captured-pieces">
          <div className="captured-pieces-section">
            <div className="captured-label">White captured:</div>
            <div className="captured-pieces-list">
              {capturedPieces.black.map((piece, index) => (
                <span key={index} className="captured-piece">
                  {getPieceSymbol(piece)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chess;