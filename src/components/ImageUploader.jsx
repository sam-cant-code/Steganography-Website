import React, { useRef } from 'react';
import Button from './Button';

/**
 * A component for handling file uploads.
 * @param {object} props - Component props.
 * @param {function} props.onImageUpload - Callback function when an image is selected.
 * @param {boolean} props.disabled - Whether the upload button should be disabled.
 */
const ImageUploader = ({ onImageUpload, disabled }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onImageUpload(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      <Button onClick={handleClick} disabled={disabled}>
        Upload Image
      </Button>
    </>
  );
};

export default ImageUploader;
