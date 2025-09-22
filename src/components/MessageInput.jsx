import React from 'react';

const MessageInput = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="secret-message" className="block text-sm font-medium text-gray-300">
        🔒 Secret Message
      </label>
      <textarea
        id="secret-message"
        value={value}
        onChange={onChange}
        placeholder="Enter your secret message here... It will be hidden in the image!"
        className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
        maxLength={1000}
      />
      <div className="text-right text-sm text-gray-500">
        {value.length}/1000 characters
      </div>
    </div>
  );
};

export default MessageInput;