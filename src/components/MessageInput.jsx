import React from 'react';

const MessageInput = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="Enter your secret message here..."
      className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
    />
  );
};

export default MessageInput;