import React from 'react';

const ImagePreview = ({ imageUrl, title }) => (
  <div className="space-y-2">
    <h4 className="text-xs font-medium text-gray-400">{title}</h4>
    {imageUrl ? (
      <img src={imageUrl} alt={title} className="w-full h-32 object-cover rounded border border-gray-600" />
    ) : (
      <div className="w-full h-64 bg-gray-800 border border-gray-600 rounded flex items-center justify-center text-xs text-gray-500">
        No image
      </div>
    )}
  </div>
);

export default ImagePreview;