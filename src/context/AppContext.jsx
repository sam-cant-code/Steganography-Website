import React, { createContext, useState, useCallback, useContext } from 'react';
import { encodeMessage, decodeMessage } from '../utils/stego';

// Create the context
const AppContext = createContext();

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create the provider component
export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('encode');
  const [secretMessage, setSecretMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [originalImage, setOriginalImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState(null);
  const [imageToDecode, setImageToDecode] = useState(null);
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
      const encodedDataUrl = await encodeMessage(originalImage, secretMessage, secretKey);
      setEncodedImage(encodedDataUrl);
    } catch (err) {
      setError(err.message || 'Failed to encode message');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, secretMessage, secretKey]);

  const handleDecode = useCallback(async () => {
    if (!imageToDecode) {
      setError('Please upload an image to decode.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const message = await decodeMessage(imageToDecode, secretKey);
      setDecodedMessage(message);
    } catch (err) {
      setError('Failed to decode message from image');
    } finally {
      setIsLoading(false);
    }
  }, [imageToDecode, secretKey]);

  // SOLUTION 1: Use Picsum (Lorem Picsum) - No CORS issues
  const fetchRandomImage = async () => {
    setIsLoading(true);
    setError('');
    setOriginalImage(null);
    setEncodedImage(null);
    setDecodedMessage('');
    
    try {
      // Using Picsum which doesn't have CORS restrictions
      const timestamp = Date.now();
      const imageUrl = `https://picsum.photos/800/600?random=${timestamp}`;
      
      const response = await fetch(imageUrl, {
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch image, status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      console.log('Random image loaded and converted to data URL');
      setOriginalImage(dataUrl);

    } catch (err) {
      console.error('Error fetching random image:', err);
      // Fallback to generating a colored canvas if fetch fails
      generateFallbackImage();
    } finally {
      setIsLoading(false);
    }
  };

  // SOLUTION 2: Alternative using JSONPlaceholder photos
  const fetchRandomImageAlternative = async () => {
    setIsLoading(true);
    setError('');
    setOriginalImage(null);
    setEncodedImage(null);
    setDecodedMessage('');
    
    try {
      // Using JSONPlaceholder which has CORS enabled
      const randomId = Math.floor(Math.random() * 5000) + 1;
      const imageUrl = `https://via.placeholder.com/800x600/4a90e2/ffffff?text=Sample+Image+${randomId}`;
      
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image, status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      console.log('Random placeholder image loaded');
      setOriginalImage(dataUrl);

    } catch (err) {
      console.error('Error fetching placeholder image:', err);
      generateFallbackImage();
    } finally {
      setIsLoading(false);
    }
  };

  // SOLUTION 3: Generate a canvas-based fallback image
  const generateFallbackImage = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, 800, 600);
      const colors = [
        ['#FF6B6B', '#4ECDC4'],
        ['#45B7D1', '#96CEB4'],
        ['#FFEAA7', '#DDA0DD'],
        ['#74B9FF', '#0984E3'],
        ['#FD79A8', '#FDCB6E']
      ];
      
      const randomColorPair = colors[Math.floor(Math.random() * colors.length)];
      gradient.addColorStop(0, randomColorPair[0]);
      gradient.addColorStop(1, randomColorPair[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);
      
      // Add some geometric shapes for visual interest
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * 800,
          Math.random() * 600,
          Math.random() * 100 + 50,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
      
      // Add text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Sample Image for Steganography', 400, 300);
      
      const dataUrl = canvas.toDataURL('image/png');
      setOriginalImage(dataUrl);
      console.log('Fallback canvas image generated');
      
    } catch (err) {
      console.error('Error generating fallback image:', err);
      setError('Unable to load or generate a sample image. Please upload your own image.');
    }
  };
  
  const handleImageUpload = useCallback((imageUrl) => {
    setOriginalImage(imageUrl);
    setEncodedImage(null);
    setDecodedMessage('');
    setError('');
  }, []);

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
    activeTab,
    setActiveTab,
    secretMessage,
    setSecretMessage,
    secretKey,
    setSecretKey,
    originalImage,
    encodedImage,
    decodedMessage,
    isLoading,
    error,
    handleEncode,
    handleDecode,
    fetchRandomImage,
    fetchRandomImageAlternative, // Alternative method
    generateFallbackImage, // Canvas-based fallback
    handleImageUpload,
    imageToDecode,
    handleImageUploadForDecode,
    clearMessages,
    hasImage: !!originalImage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};