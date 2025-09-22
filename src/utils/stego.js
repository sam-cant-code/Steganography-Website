/**
 * Simple XOR encryption/decryption
 */
export const encryptMessage = (message, key) => {
  if (!key) return message;
  
  let encrypted = '';
  for (let i = 0; i < message.length; i++) {
    const messageChar = message.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(messageChar ^ keyChar);
  }
  return encrypted;
};

export const decryptMessage = (encryptedMessage, key) => {
  // XOR encryption is symmetric, so decryption is the same as encryption
  return encryptMessage(encryptedMessage, key);
};

/**
 * Convert text to binary string - IMPROVED to handle Unicode properly
 */
export const textToBinary = (text) => {
  // Use TextEncoder to handle Unicode characters properly
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  
  return Array.from(bytes)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('');
};

/**
 * Convert binary string to text - IMPROVED to handle Unicode properly
 */
export const binaryToText = (binary) => {
  try {
    const bytes = [];
    
    // Convert binary to bytes
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.slice(i, i + 8);
      if (byte.length === 8) {
        bytes.push(parseInt(byte, 2));
      }
    }
    
    // Use TextDecoder to handle Unicode characters properly
    const decoder = new TextDecoder('utf-8');
    const uint8Array = new Uint8Array(bytes);
    return decoder.decode(uint8Array);
  } catch (error) {
    console.error('Binary to text conversion error:', error);
    return '';
  }
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
 * Hide a message in an image using LSB steganography with optional encryption
 */
export const hideMessageInImage = (canvas, message, secretKey = '') => {
  try {
    console.log('Encoding message:', message);
    console.log('Using key:', secretKey ? '[KEY PROVIDED]' : '[NO KEY]');
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Invalid canvas context');
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Encrypt the message first if key is provided
    const processedMessage = secretKey ? encryptMessage(message, secretKey) : message;
    console.log('Processed message length:', processedMessage.length);
    
    // SIMPLIFIED: Use simple text delimiters instead of emoji
    const keyIndicator = secretKey ? 'ENCRYPTED:' : 'PLAIN:';
    const messageWithDelimiter = keyIndicator + processedMessage + '|||END|||';
    const binaryMessage = textToBinary(messageWithDelimiter);
    
    console.log('Binary message length:', binaryMessage.length);
    console.log('First 64 bits:', binaryMessage.substring(0, 64));
    
    const maxBits = Math.floor(data.length / 4);
    
    if (binaryMessage.length > maxBits) {
      throw new Error(`Message too long for this image. Maximum characters: ${Math.floor(maxBits / 8) - 20}`);
    }
    
    // Hide the message in LSB of red channel
    for (let i = 0; i < binaryMessage.length; i++) {
      const pixelIndex = i * 4; // Red channel
      const bit = parseInt(binaryMessage[i]);
      data[pixelIndex] = (data[pixelIndex] & 0xFE) | bit;
    }
    
    ctx.putImageData(imageData, 0, 0);
    console.log('Message successfully encoded');
    return canvas.toDataURL('image/png');
    
  } catch (error) {
    console.error('Encoding error:', error);
    throw error;
  }
};

/**
 * Extract a hidden message from an image using LSB steganography with optional decryption
 */
export const extractMessageFromImage = (canvas, secretKey = '') => {
  try {
    console.log('Starting extraction...');
    console.log('Using key:', secretKey ? '[KEY PROVIDED]' : '[NO KEY]');
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Invalid canvas context');
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let binaryMessage = '';
    const delimiter = textToBinary('|||END|||');
    const maxBits = Math.floor(data.length / 4);
    
    console.log('Delimiter binary:', delimiter);
    console.log('Max bits available:', maxBits);
    
    // Extract bits from LSB of red channel
    for (let i = 0; i < maxBits; i++) {
      const pixelIndex = i * 4; // Red channel
      const bit = data[pixelIndex] & 1;
      binaryMessage += bit.toString();
      
      // Check if we've found the delimiter
      if (binaryMessage.length >= delimiter.length && binaryMessage.endsWith(delimiter)) {
        console.log('Found delimiter at position:', i);
        
        const messageBits = binaryMessage.slice(0, -delimiter.length);
        console.log('Message bits length:', messageBits.length);
        console.log('First 64 message bits:', messageBits.substring(0, 64));
        
        const extractedText = binaryToText(messageBits);
        console.log('Extracted text:', extractedText);
        
        if (!extractedText) {
          console.log('No text extracted');
          return 'No hidden message found';
        }
        
        // Check for encryption indicators
        if (extractedText.startsWith('ENCRYPTED:')) {
          const encryptedMessage = extractedText.substring(10); // Remove 'ENCRYPTED:' prefix
          if (!secretKey) {
            return '🔐 This message is encrypted! Please provide the secret key to decrypt it.';
          }
          const decryptedMessage = decryptMessage(encryptedMessage, secretKey);
          console.log('Decrypted message:', decryptedMessage);
          return decryptedMessage || 'Failed to decrypt message. Check your secret key.';
          
        } else if (extractedText.startsWith('PLAIN:')) {
          const plainMessage = extractedText.substring(6); // Remove 'PLAIN:' prefix
          console.log('Plain message:', plainMessage);
          return plainMessage || 'Empty message found';
        }
        
        // Fallback for messages without indicators
        console.log('Message without indicator:', extractedText);
        return extractedText.trim() || 'Empty message found';
      }
    }
    
    console.log('No delimiter found');
    return 'No hidden message found';
    
  } catch (error) {
    console.error('Decoding error:', error);
    return 'Failed to decode message: ' + error.message;
  }
};

/**
 * Encode a message into an image with optional encryption
 */
export const encodeMessage = async (imageSrc, message, secretKey = '') => {
  try {
    const canvas = await createCanvasFromImage(imageSrc);
    return hideMessageInImage(canvas, message, secretKey);
  } catch (error) {
    console.error('Encode message error:', error);
    throw error;
  }
};

/**
 * Decode a message from an image with optional decryption
 */
export const decodeMessage = async (imageSrc, secretKey = '') => {
  try {
    const canvas = await createCanvasFromImage(imageSrc);
    return extractMessageFromImage(canvas, secretKey);
  } catch (error) {
    console.error('Decode message error:', error);
    throw error;
  }
};