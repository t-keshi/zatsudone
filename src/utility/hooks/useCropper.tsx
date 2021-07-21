import { useRef, useState } from 'react';
import { ReactCropperElement } from 'react-cropper';

type UseCropperReturnType = [
  {
    cropperRef: React.RefObject<ReactCropperElement>;
    croppedFile: File | undefined;
  },
  () => void,
];

export const useCropper = (): UseCropperReturnType => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [croppedFile, setCroppedFile] = useState<File | undefined>(undefined);

  const handleCrop = () => {
    const imageElement: ReactCropperElement | null = cropperRef?.current;

    const cropper = imageElement?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      if (blob !== null) {
        const newFile = new File([blob], 'fileName.jpg', {
          type: 'image/jpeg',
        });

        setCroppedFile(newFile);
      }
    }, 'image/jpeg');
  };

  return [{ cropperRef, croppedFile }, handleCrop];
};
