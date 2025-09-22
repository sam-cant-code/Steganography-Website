import React from 'react';
import { useAppContext } from '../context/AppContext';
import Button from './Button';
import ImageUploader from './ImageUploader';
import KeyInput from './KeyInput';
import ImagePreview from './ImagePreview';

const DecodePanel = () => {
  const {
    handleImageUploadForDecode, handleDecode, decodedMessage,
    secretKey, setSecretKey, isLoading, imageToDecode
  } = useAppContext();

  const isEncrypted = decodedMessage.includes('🔐');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cyan-400">Reveal Message</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Secret Key {secretKey ? '🔐' : '🔓'}
          </label>
          <KeyInput
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter key if encrypted"
          />
        </div>

        <div className="flex gap-2">
          <ImageUploader onImageUpload={handleImageUploadForDecode} disabled={isLoading} />
          <Button
            onClick={handleDecode}
            disabled={!imageToDecode || isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? '⏳' : '🔍 Decode'}
          </Button>
        </div>
      </div>

      {imageToDecode && (
        <ImagePreview imageUrl={imageToDecode} title="Image to Decode" />
      )}

      {decodedMessage && (
        <div className={`p-3 rounded border text-sm ${
          isEncrypted 
            ? 'bg-yellow-900/20 border-yellow-700/50 text-yellow-200'
            : 'bg-purple-900/20 border-purple-700/50 text-purple-200'
        }`}>
          <div className="font-medium mb-2">
            {isEncrypted ? '🔐 Encrypted Found' : '🔓 Message Revealed'}
          </div>
          <div className="bg-gray-900/50 p-2 rounded text-white text-xs break-words">
            "{decodedMessage}"
          </div>
        </div>
      )}
    </div>
  );
};

export default DecodePanel;