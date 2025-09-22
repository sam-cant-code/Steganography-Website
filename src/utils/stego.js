// utils/stego.js - Enhanced with debugging and fixes

/**
 * Convert text to binary string
 */
export const textToBinary = (text) => {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
};

/**
 * Convert binary string to text
 */
export const binaryToText = (binary) => {
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    if (byte.length === 8) {
      const charCode = parseInt(byte, 2);
      if (charCode >= 32 && charCode <= 126) {
        text += String.fromCharCode(charCode);
      } else if (charCode === 10 || charCode === 13) {
        text += String.fromCharCode(charCode);
      }
    }
  }
  return text;
};

/**
 * Create a canvas element from an image source
 */
export const createCanvasFromImage = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData || imageData.data.length === 0) {
          reject(new Error('Failed to get image data from canvas'));
          return;
        }
        
        resolve(canvas);
      } catch (error) {
        reject(new Error(`Canvas creation failed: ${error.message}`));
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image. Check if the image URL is valid and accessible.'));
    };
    
    if (imageSrc.startsWith('http') && !imageSrc.startsWith(window.location.origin)) {
      img.crossOrigin = 'anonymous';
    }
    
    img.src = imageSrc;
  });
};

/**
 * Hide a message in an image using LSB steganography
 */
export const hideMessageInImage = (canvas, message) => {
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Invalid canvas context');
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const messageWithDelimiter = message + '###END###';
    const binaryMessage = textToBinary(messageWithDelimiter);
    
    const maxBits = Math.floor(data.length / 4);
    
    if (binaryMessage.length > maxBits) {
      throw new Error(`Message too long for this image. Maximum characters: ${Math.floor(maxBits / 8) - 9}`);
    }
    
    for (let i = 0; i < binaryMessage.length; i++) {
      const pixelIndex = i * 4;
      const bit = parseInt(binaryMessage[i]);
      data[pixelIndex] = (data[pixelIndex] & 0xFE) | bit;
    }
    
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
    
  } catch (error) {
    console.error('Encoding error:', error);
    throw error;
  }
};

/**
 * Extract a hidden message from an image using LSB steganography
 */
export const extractMessageFromImage = (canvas) => {
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Invalid canvas context');
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let binaryMessage = '';
    const delimiter = textToBinary('###END###');
    const maxBits = Math.floor(data.length / 4);
    
    for (let i = 0; i < maxBits; i++) {
      const pixelIndex = i * 4;
      const bit = data[pixelIndex] & 1;
      binaryMessage += bit.toString();
      
      if (binaryMessage.length >= delimiter.length && binaryMessage.endsWith(delimiter)) {
        const messageBits = binaryMessage.slice(0, -delimiter.length);
        const extractedText = binaryToText(messageBits);
        return extractedText.trim() || 'Empty message found';
      }
    }
    
    return 'No hidden message found';
    
  } catch (error) {
    console.error('Decoding error:', error);
    throw error;
  }
};

/**
 * Encode a message into an image
 */
export const encodeMessage = async (imageSrc, message) => {
  const canvas = await createCanvasFromImage(imageSrc);
  return hideMessageInImage(canvas, message);
};

/**
 * Decode a message from an image
 */
export const decodeMessage = async (imageSrc) => {
  const canvas = await createCanvasFromImage(imageSrc);
  return extractMessageFromImage(canvas);
};