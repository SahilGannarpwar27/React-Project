/* eslint-disable react/prop-types */
import { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { IconPack } from '../../constants/IconPack'


function Dashboard({ 
  initialImage = "/api/placeholder/300/300", // Default placeholder or pass a prop
  onImageChange = () => {} // Callback when image changes
}) {
  const [imgSrc, setImgSrc] = useState(IconPack.userImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  // const previewCanvasRef = useRef(null);

  // Trigger file input click when the image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle file upload
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result);
        setIsUploading(false);
        setIsCropping(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Initialize crop when image loads
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    
    // Make a centered square crop by default
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // 1:1 aspect ratio
        width,
        height
      ),
      width,
      height
    );
    
    setCrop(crop);
    imgRef.current = e.currentTarget;
  };

  // Apply crop and update the displayed image
  const applyCrop = useCallback(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // Convert canvas to data URL
    const croppedImageUrl = canvas.toDataURL('image/jpeg');
    
    // Replace the original image with the cropped one
    setImgSrc(croppedImageUrl);
    setIsCropping(false);
    
    // Call the callback with the new image
    onImageChange(croppedImageUrl);
  }, [completedCrop, onImageChange]);

  // Cancel cropping
  const cancelCrop = () => {
    setIsCropping(false);
  };

  return (
    <div className="relative">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
      />

      {/* Main image display or cropping interface */}
      {isCropping ? (
        <div className="border p-4 rounded-lg">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
          >
            <img
              src={imgSrc}
              onLoad={onImageLoad}
              alt="Upload"
              className="max-w-full max-h-96"
            />
          </ReactCrop>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={cancelCrop}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={applyCrop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={!completedCrop}
            >
              Apply Crop
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={handleImageClick} 
          className="cursor-pointer relative group"
        >
          <img
            src={imgSrc}
            alt="Click to upload"
            className="w-full rounded-lg border hover:opacity-90 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">
              Click to {initialImage === imgSrc ? 'Upload' : 'Change'} Image
            </span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;