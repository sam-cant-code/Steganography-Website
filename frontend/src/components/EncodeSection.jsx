import React from 'react';
import { useAppContext } from '../context/AppContext';
import Button from './Button';
import MessageInput from './MessageInput';
import ImagePreview from './ImagePreview';

const EncodeSection = () => {
  const {
    secretMessage,
    setSecretMessage,
    originalImage,
    encodedImage,
    fetchRandomImage,
    handleEncode,
    isLoading,
  } = useAppContext();

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">Encode Message</h2>
      <MessageInput value={secretMessage} onChange={(e) => setSecretMessage(e.target.value)} />
      <div className="flex gap-4">
        <Button onClick={fetchRandomImage} disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Fetch Random Image'}
        </Button>
        <Button onClick={handleEncode} disabled={!originalImage || !secretMessage || isLoading}>
          Encode Message
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <ImagePreview title="Original Image" imageUrl={originalImage} placeholderText="Fetch or upload an image" />
        <ImagePreview title="Encoded Image" imageUrl={encodedImage} placeholderText="Your encoded image will appear here">
          {encodedImage && (
            <a href={encodedImage} download="encoded-image.png">
              <Button>Download Image</Button>
            </a>
          )}
        </ImagePreview>
      </div>
    </div>
  );
};

export default EncodeSection;
