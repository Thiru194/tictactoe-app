import React, { useState } from 'react';
import backgroundImage from '../Assets/bg.jpg'; // Import the image file

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // Set minimum height to cover the viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(80px, 1fr))',
    gridGap: '10px',
    maxWidth: '400px', // Limit board width for better responsiveness
    width: '100%', // Ensure board takes full width on smaller screens
  };

  const boxStyle = {
    width: '100%',
    aspectRatio: '1 / 1', // Ensure boxes maintain a square aspect ratio
    border: '2px solid transparent',
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    fontSize: '36px',
    cursor: 'pointer',
    backgroundColor: '#3a3a3a',
    color: xIsNext ? '#ff00ff' : '#00ffff', // Neon colors for X and O
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, border 0.3s ease, color 0.3s ease', // Added transition for background-color, border, and color
  };
  
  const winnerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px',
    color: '#ff00ff', // Neon color for winner text
  };

  const resetButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[index]) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(newBoard);
    if (winner) {
      setWinner(winner);
    }
  };

  const renderBoxes = () => {
    return board.map((value, index) => (
      <div key={index} style={boxStyle} onClick={() => handleClick(index)}>
        {value}
      </div>
    ));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const status = winner ? `Winner: ${winner}` : board.every(square => square) ? 'Draw' : `Next player: ${xIsNext ? 'X' : 'O'}`;


  return (
    <div style={containerStyle}>
      <h1 className='text-white' style={{ marginBottom: '20px' }}>TicTacToe Game</h1>
      <div style={boardStyle}>{renderBoxes()}</div>
      <div className="text-center mt-3" style={winnerStyle}>{status}</div>
      <button style={resetButtonStyle} onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
