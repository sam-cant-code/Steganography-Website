import React from 'react';
import { useAppContext } from '../context/AppContext';
import Button from './Button';
import ImageUploader from './ImageUploader';
import KeyInput from './KeyInput';
import Textarea from './TextArea';
import ImagePreview from './ImagePreview';

const EncodePanel = () => {
  const {
    secretMessage, setSecretMessage, secretKey, setSecretKey,
    originalImage, encodedImage, fetchRandomImage, handleEncode,
    handleImageUpload, isLoading
  } = useAppContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cyan-400">Hide Message</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Message</label>
          <Textarea
            value={secretMessage}
            onChange={(e) => setSecretMessage(e.target.value)}
            placeholder="Enter secret message..."
          />
          <div className="text-xs text-gray-500 mt-1">{secretMessage.length}/500</div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Secret Key {secretKey ? '🔐' : '🔓'}
            </label>
            <KeyInput
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Optional encryption key"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={fetchRandomImage} disabled={isLoading}>
            🎲 Random
          </Button>
          <ImageUploader onImageUpload={handleImageUpload} disabled={isLoading} />
          <Button
            onClick={handleEncode}
            disabled={!originalImage || !secretMessage || isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? '⏳' : (secretKey ? '🔐 Encrypt' : '📝 Hide')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ImagePreview imageUrl={originalImage} title="Original" />
        <div className="space-y-2">
          <ImagePreview imageUrl={encodedImage} title="Encoded" />
          {encodedImage && (
            <a href={encodedImage} download="encoded.png">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">📥 Download</Button>
            </a>
          )}
        </div>
      </div>

      {encodedImage && (
        <div className="p-3 bg-green-900/20 border border-green-700/50 rounded text-sm">
          <div className="text-green-300">
            ✅ Message {secretKey ? 'encrypted & ' : ''}hidden!
            {secretKey && <div className="text-yellow-300 mt-1">🔑 Remember your key!</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EncodePanel;