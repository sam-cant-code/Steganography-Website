import React, { createContext, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { encodeMessage, decodeMessage } from '../utils/stego';

// Create the context
const AppContext = createContext();

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create the provider component
export const AppProvider = ({ children }) => {
  const [secretMessage, setSecretMessage] = useState('');
  const [originalImage, setOriginalImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState(null);
  const [imageToDecode, setImageToDecode] = useState(null); // New state for decoding image
  const [decodedMessage, setDecodedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEncode = useCallback(async () => {
    if (!originalImage || !secretMessage) {
      setError('Please provide an image and a secret message.');
      return;
    }
    
    if (secretMessage.length > 1000) {
      setError('Message too long. Please keep it under 1000 characters.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const encodedDataUrl = await encodeMessage(originalImage, secretMessage);
      setEncodedImage(encodedDataUrl);
    } catch (err) {
      setError(err.message || 'Failed to encode message');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, secretMessage]);

  const handleDecode = useCallback(async () => {
    if (!imageToDecode) { // Use the new state here
      setError('Please upload an image to decode.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const message = await decodeMessage(imageToDecode); // And here
      setDecodedMessage(message);
    } catch (err) {
      setError('Failed to decode message from image');
    } finally {
      setIsLoading(false);
    }
  }, [imageToDecode]); // And here

  const fetchRandomImage = async () => {
  setIsLoading(true);
  setError('');
  setOriginalImage(null);
  setEncodedImage(null);
  setDecodedMessage('');
  
  try {
    const timestamp = Date.now();
    const imageUrl = `https://picsum.photos/800/600?random=${timestamp}`;
    
    // Create a canvas and convert to data URL immediately
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    await new Promise((resolve, reject) => {
      img.onload = () => {
        // Draw to canvas and convert to data URL immediately
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Convert to data URL so we have a stable image reference
        const dataUrl = canvas.toDataURL('image/png');
        console.log('Random image loaded and converted to data URL');
        setOriginalImage(dataUrl); // Store as data URL instead of external URL
        resolve();
      };
      img.onerror = () => {
        reject(new Error('Failed to load image from Picsum'));
      };
      img.src = imageUrl;
    });

  } catch (err) {
    console.error('Error fetching random image:', err);
    setError('Failed to fetch random image. Please upload an image manually.');
  } finally {
    setIsLoading(false);
  }
};
  
  const handleImageUpload = useCallback((imageUrl) => {
    setOriginalImage(imageUrl);
    setEncodedImage(null);
    setDecodedMessage('');
    setError('');
  }, []);

  // New handler for the decode section's uploader
  const handleImageUploadForDecode = useCallback((imageUrl) => {
    setImageToDecode(imageUrl);
    setDecodedMessage('');
    setError('');
  }, []);

  const clearMessages = useCallback(() => {
    setDecodedMessage('');
    setError('');
  }, []);

  const value = {
    secretMessage,
    setSecretMessage,
    originalImage,
    encodedImage,
    decodedMessage,
    isLoading,
    error,
    handleEncode,
    handleDecode,
    fetchRandomImage,
    handleImageUpload,
    imageToDecode, // Export new state
    handleImageUploadForDecode, // Export new handler
    clearMessages,
    hasImage: !!originalImage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};