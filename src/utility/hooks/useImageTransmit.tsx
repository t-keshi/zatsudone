import { useState } from 'react';

type UseImageTransmitReturnType = [
  {
    image: File | undefined;
    imageName: string;
    imageDataUrl: string | undefined;
  },
  (e: React.ChangeEvent<HTMLInputElement>) => void,
];

export const useImageTransmit = (): UseImageTransmitReturnType => {
  const [image, setImage] = useState<File | undefined>();
  const [imageName, setImageName] = useState<string>('');
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(
    undefined,
  );
  const handleTransmitImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      console.warn('画像が選択されていません');
    } else {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageDataUrl(reader.result as string);
      };
    }
  };

  return [{ image, imageName, imageDataUrl }, handleTransmitImage];
};
