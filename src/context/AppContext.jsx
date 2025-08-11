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
    if (!originalImage) {
      setError('Please upload an image to decode.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const message = await decodeMessage(originalImage);
      setDecodedMessage(message);
    } catch (err) {
      setError('Failed to decode message from image');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const fetchRandomImage = async () => {
    setIsLoading(true);
    setError('');
    setOriginalImage(null);
    setEncodedImage(null);
    setDecodedMessage('');
    
    try {
      // Use direct URL approach - this works better with CORS
      const timestamp = Date.now();
      const imageUrl = `https://picsum.photos/800/600?random=${timestamp}`;
      
      // Test if image loads properly
      const testImage = new Image();
      testImage.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        testImage.onload = () => {
          console.log('Random image loaded successfully');
          setOriginalImage(imageUrl);
          resolve();
        };
        testImage.onerror = () => {
          reject(new Error('Failed to load image from Picsum'));
        };
        testImage.src = imageUrl;
      });

    } catch (err) {
      console.error('Error fetching random image:', err);
      
      // Fallback to alternative image services
      try {
        const fallbackServices = [
          `https://source.unsplash.com/800x600/?nature&${Date.now()}`,
          `https://picsum.photos/800/600?grayscale&random=${Date.now()}`,
          `https://via.placeholder.com/800x600/4f46e5/ffffff?text=Sample+Image`
        ];
        
        for (const serviceUrl of fallbackServices) {
          try {
            const fallbackImage = new Image();
            fallbackImage.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
              fallbackImage.onload = () => {
                console.log(`Fallback image loaded: ${serviceUrl}`);
                setOriginalImage(serviceUrl);
                resolve();
              };
              fallbackImage.onerror = reject;
              fallbackImage.src = serviceUrl;
            });
            
            return; // Success, exit the function
          } catch (fallbackError) {
            console.log(`Fallback failed for ${serviceUrl}:`, fallbackError);
            continue; // Try next service
          }
        }
        
        // If all services fail
        setError('Failed to fetch random image from all services. Please upload an image manually.');
        
      } catch (fallbackErr) {
        setError('Failed to fetch random image. Please upload an image manually.');
      }
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

  // Alternative method using axios for file uploads (if needed)
  const uploadImageToServer = async (file) => {
    setIsLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout for uploads
        onUploadProgress: (progressEvent) => {
          // Optional: Handle upload progress
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });
      
      // Assuming server returns image URL
      setOriginalImage(response.data.imageUrl);
      
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Upload timeout. Please try again with a smaller file.');
      } else if (err.response?.status === 413) {
        setError('File too large. Please choose a smaller image.');
      } else if (err.response?.status === 415) {
        setError('Unsupported file type. Please upload a valid image file.');
      } else {
        setError('Failed to upload image. Please try again.');
      }
      
      console.error('Error uploading image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Method to cancel ongoing requests (useful for cleanup)
  const cancelTokenSource = axios.CancelToken.source();
  
  const cancelRequests = useCallback(() => {
    cancelTokenSource.cancel('Operation canceled by user');
  }, [cancelTokenSource]);

  // Clear messages helper
  const clearMessages = useCallback(() => {
    setDecodedMessage('');
    setError('');
  }, []);

  // Value provided to the context consumers
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
    uploadImageToServer, // Additional method for server uploads
    cancelRequests, // Method to cancel ongoing requests
    clearMessages, // Helper to clear messages
    hasImage: !!originalImage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};