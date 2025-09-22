import React from 'react';

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