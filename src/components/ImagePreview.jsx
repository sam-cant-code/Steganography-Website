import React from 'react';

/**
 * A component to display an image preview.
 * @param {object} props - Component props.
 * @param {string} props.title - The title to display above the image.
 * @param {string|null} props.imageUrl - The URL of the image to display.
 * @param {string} [props.placeholderText=""] - Text to show when there is no image.
 * @param {React.ReactNode} [props.children] - Additional elements to render, like a download button.
 */
const ImagePreview = ({ title, imageUrl, placeholderText, children }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-between h-full">
      <h3 className="text-lg font-semibold text-gray-300 mb-3">{title}</h3>
      <div className="flex-grow w-full flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="max-w-full max-h-64 object-contain rounded-md" />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded-md text-gray-500">
            {placeholderText}
          </div>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default ImagePreview;
