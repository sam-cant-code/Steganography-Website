import React, { createContext, useState, useCallback, useContext } from 'react';
import axios from 'axios';

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

  // --- Placeholder Logic ---

  const handleEncode = useCallback(() => {
    if (!originalImage || !secretMessage) {
      setError('Please provide an image and a secret message.');
      return;
    }
    setError('');
    // Placeholder: Simply copy the original image to the encoded state.
    setEncodedImage(originalImage);
  }, [originalImage, secretMessage]);

  const handleDecode = useCallback(() => {
    if (!originalImage) {
      setError('Please upload an image to decode.');
      return;
    }
    setError('');
    // Placeholder: Set a fixed message.
    setDecodedMessage('Decoding logic is not implemented in this version.');
  }, [originalImage]);

  const fetchRandomImage = async () => {
    setIsLoading(true);
    setError('');
    setOriginalImage(null);
    setEncodedImage(null);
    setDecodedMessage('');
    
    try {
      const response = await axios.get('https://picsum.photos/500/500', {
        responseType: 'blob', // Important: specify blob response type
        timeout: 10000, // 10 second timeout
        headers: {
          'Accept': 'image/*'
        }
      });
      
      // Create object URL from the blob response
      const imageUrl = URL.createObjectURL(response.data);
      setOriginalImage(imageUrl);
      
    } catch (err) {
      // Handle different types of axios errors
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your internet connection and try again.');
      } else if (err.response) {
        // Server responded with error status
        setError(`Server error: ${err.response.status}. Failed to fetch random image.`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error. Please check your internet connection and try again.');
      } else {
        // Something else happened
        setError('Failed to fetch random image. Please try again or upload one manually.');
      }
      
      console.error('Error fetching random image:', err);
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
    hasImage: !!originalImage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};