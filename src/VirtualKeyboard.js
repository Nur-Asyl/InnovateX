import React from 'react';

const VirtualKeyboard = ({ onKeyPress, onDelete, onSearch }) => {
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Del', 'Space', 'Enter'],
  ];

  const handleKeyPress = (key) => {
    onKeyPress(key);
  };

  const handleSpace = () => {
    onKeyPress(' ');
  };

  const handleEnter = () => {
    onSearch(); // Trigger the search function when Enter is pressed
  };

  return (
    <div className="virtual-keyboard">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`keyboard-key ${key === 'Del' ? 'delete' : ''}`}
              onClick={() => {
                if (key === 'Del') {
                  onDelete();
                } else if (key === 'Space') {
                  handleSpace();
                } else if (key === 'Enter') {
                  handleEnter();
                } else {
                  handleKeyPress(key);
                }
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
