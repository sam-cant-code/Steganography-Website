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
      // Only add printable characters to avoid issues
      if (charCode >= 32 && charCode <= 126) {
        text += String.fromCharCode(charCode);
      } else if (charCode === 10 || charCode === 13) {
        // Allow newline and carriage return
        text += String.fromCharCode(charCode);
      }
    }
  }
  return text;
};

/**
 * Create a canvas element from an image source
 * Enhanced with better error handling and CORS support
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
        
        // Ensure we have a valid context
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Verify the image was drawn correctly
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData || imageData.data.length === 0) {
          reject(new Error('Failed to get image data from canvas'));
          return;
        }
        
        console.log(`Canvas created: ${canvas.width}x${canvas.height}, pixels: ${imageData.data.length/4}`);
        resolve(canvas);
      } catch (error) {
        reject(new Error(`Canvas creation failed: ${error.message}`));
      }
    };
    
    img.onerror = (error) => {
      console.error('Image load error:', error);
      reject(new Error('Failed to load image. Check if the image URL is valid and accessible.'));
    };
    
    // Handle CORS for external images
    if (imageSrc.startsWith('http') && !imageSrc.startsWith(window.location.origin)) {
      img.crossOrigin = 'anonymous';
    }
    
    img.src = imageSrc;
  });
};

/**
 * Hide a message in an image using LSB steganography
 * Enhanced with better validation and debugging
 */
export const hideMessageInImage = (canvas, message) => {
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Invalid canvas context');
    }
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    console.log(`Original image: ${canvas.width}x${canvas.height}, total pixels: ${data.length/4}`);
    
    // Add delimiter to mark end of message
    const messageWithDelimiter = message + '###END###';
    const binaryMessage = textToBinary(messageWithDelimiter);
    
    console.log(`Message length: ${message.length} chars, Binary length: ${binaryMessage.length} bits`);
    
    // Check if message fits in image (only use red channel)
    const maxBits = Math.floor(data.length / 4);
    console.log(`Available capacity: ${maxBits} bits, Required: ${binaryMessage.length} bits`);
    
    if (binaryMessage.length > maxBits) {
      throw new Error(`Message too long for this image. Maximum characters: ${Math.floor(maxBits / 8) - 9}`);
    }
    
    let modifiedPixels = 0;
    
    // Hide message in LSB of red channel
    for (let i = 0; i < binaryMessage.length; i++) {
      const pixelIndex = i * 4; // Red channel of each pixel
      const bit = parseInt(binaryMessage[i]);
      const originalValue = data[pixelIndex];
      
      // Clear LSB and set new bit
      data[pixelIndex] = (data[pixelIndex] & 0xFE) | bit;
      
      if (data[pixelIndex] !== originalValue) {
        modifiedPixels++;
      }
    }
    
    console.log(`Modified ${modifiedPixels} pixels out of ${binaryMessage.length} total bits`);
    
    // Put the modified image data back
    ctx.putImageData(imageData, 0, 0);
    
    // Convert to data URL with maximum quality
    const encodedDataUrl = canvas.toDataURL('image/png');
    console.log(`Encoded image data URL length: ${encodedDataUrl.length}`);
    
    return encodedDataUrl;
    
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
    if (!ctx) {
      throw new Error('Invalid canvas context');
    }
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    console.log(`Decoding from image: ${canvas.width}x${canvas.height}`);
    
    let binaryMessage = '';
    const delimiter = textToBinary('###END###');
    const maxBits = Math.floor(data.length / 4);
    
    console.log(`Delimiter binary: ${delimiter}, length: ${delimiter.length}`);
    
    // Extract bits from LSB of red channel
    for (let i = 0; i < maxBits; i++) {
      const pixelIndex = i * 4;
      const bit = data[pixelIndex] & 1;
      binaryMessage += bit.toString();
      
      // Check if we've found the delimiter (every 8 bits)
      if (binaryMessage.length >= delimiter.length && binaryMessage.length % 8 === 0) {
        const lastBits = binaryMessage.slice(-delimiter.length);
        if (lastBits === delimiter) {
          // Remove delimiter and convert to text
          const messageBits = binaryMessage.slice(0, -delimiter.length);
          const extractedText = binaryToText(messageBits);
          
          console.log(`Found delimiter at bit ${i}, extracted ${messageBits.length} message bits`);
          console.log(`Decoded text: "${extractedText}"`);
          
          return extractedText.trim() || 'Empty message found';
        }
      }
      
      // Prevent infinite loop - stop if we've extracted too much
      if (binaryMessage.length > delimiter.length + (1000 * 8)) {
        console.log(`Stopped extraction at ${binaryMessage.length} bits (safety limit)`);
        break;
      }
    }
    
    console.log(`No delimiter found in ${binaryMessage.length} extracted bits`);
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
  console.log('Starting encoding process...');
  const canvas = await createCanvasFromImage(imageSrc);
  return hideMessageInImage(canvas, message);
};

/**
 * Decode a message from an image
 */
export const decodeMessage = async (imageSrc) => {
  console.log('Starting decoding process...');
  const canvas = await createCanvasFromImage(imageSrc);
  return extractMessageFromImage(canvas);
};

/**
 * Compare two images to show the differences (for debugging)
 */
export const compareImages = async (originalSrc, encodedSrc) => {
  try {
    const originalCanvas = await createCanvasFromImage(originalSrc);
    const encodedCanvas = await createCanvasFromImage(encodedSrc);
    
    const originalData = originalCanvas.getContext('2d').getImageData(0, 0, originalCanvas.width, originalCanvas.height).data;
    const encodedData = encodedCanvas.getContext('2d').getImageData(0, 0, encodedCanvas.width, encodedCanvas.height).data;
    
    let differences = 0;
    let maxDifference = 0;
    
    for (let i = 0; i < originalData.length; i++) {
      const diff = Math.abs(originalData[i] - encodedData[i]);
      if (diff > 0) {
        differences++;
        maxDifference = Math.max(maxDifference, diff);
      }
    }
    
    console.log(`Image comparison:
      - Total bytes compared: ${originalData.length}
      - Different bytes: ${differences}
      - Percentage different: ${(differences/originalData.length*100).toFixed(2)}%
      - Maximum difference: ${maxDifference}
    `);
    
    return {
      totalBytes: originalData.length,
      differentBytes: differences,
      percentageDifferent: differences/originalData.length*100,
      maxDifference
    };
  } catch (error) {
    console.error('Comparison error:', error);
    throw error;
  }
};