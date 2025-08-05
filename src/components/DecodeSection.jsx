import React from 'react';
import { useAppContext } from '../context/AppContext';
import Button from './Button';
import ImageUploader from './ImageUploader';

const DecodeSection = () => {
  const {
    handleImageUpload,
    handleDecode,
    decodedMessage,
    isLoading,
    hasImage,
  } = useAppContext();

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">Decode Message</h2>
      <div className="flex gap-4">
        <ImageUploader onImageUpload={handleImageUpload} disabled={isLoading} />
        <Button onClick={handleDecode} disabled={!hasImage || isLoading}>
          Decode Message
        </Button>
      </div>
      {decodedMessage && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-gray-300">Decoded Message:</h3>
          <p className="text-cyan-300 break-words">{decodedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DecodeSection;
