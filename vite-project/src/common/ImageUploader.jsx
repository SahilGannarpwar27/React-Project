import { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function ImageUploader({ 
  initialImage, // Pass your IconPack.userImage here
  onImageChange = () => {} // Optional callback for when image changes
}) {
  const [imgSrc, setImgSrc] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // Trigger file input when the image is clicked
  const handleImageClick = () => {
    if (!isCropping) {
      fileInputRef.current.click();
    }
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
    
    // Make a centered square crop by default (perfect for profile pictures)
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // 1:1 aspect ratio to match your aspect-square
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
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
      />

      {/* Cropping modal - shows only during cropping */}
      {isCropping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full">
            <h3 className="text-lg font-medium mb-2">Crop Image</h3>
            <div className="mb-4">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop={false} // Set to true if you want circular crop preview
              >
                <img
                  src={imgSrc}
                  onLoad={onImageLoad}
                  alt="Upload"
                  className="max-w-full max-h-96"
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end space-x-2">
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
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Your existing div structure */}
      <div className="w-24 sm:w-32 aspect-square flex-shrink-0 rounded-full overflow-hidden border border-gray-300 relative cursor-pointer group" onClick={handleImageClick}>
        <img src={imgSrc} alt="User" className="w-full h-full object-cover" />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-200">
          <span className="text-white opacity-0 group-hover:opacity-100 text-xs sm:text-sm font-medium">
            Change
          </span>
        </div>
        
        {/* Loading indicator */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default ImageUploader;