import { useState } from 'react';
import imageNotFound from '../../assets/imageNotFound.jpeg';

type ReturnType = [
  Blob | undefined,
  string,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
];

export const useImageUpload = (): ReturnType => {
  const [image, setImage] = useState<Blob | undefined>();
  const [fileName, setFileName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(imageNotFound);
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      console.warn('画像が選択されていません');
    } else {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
    }
  };

  return [image, fileName, imageUrl, handleUploadImage];
};
