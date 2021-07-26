import 'cropperjs/dist/cropper.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import imageNotFound from '../../../../assets/imageNotFound.jpeg';
import { useUpdateConcert } from '../../../../containers/controllers/concert/useUpdateConcert';
import { useCropper } from '../../../../utility/hooks/useCropper';
import { useImageTransmit } from '../../../../utility/hooks/useImageTransmit';
import { DialogCustom } from '../../../helpers/DialogCustom/DialogCustom';
import { FormImageField } from '../../../helpers/FormTextField/FormImageField';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  name: string;
}

export const ConcertFlayerFormDialog: React.VFC<Props> = ({
  isModalOpen,
  closeModal,
}) => {
  const [{ imageDataUrl: coverImageDataUrl }, handleTransmitCoverImage] =
    useImageTransmit();
  const [
    { cropperRef: coverCropperRef, croppedFile: coverImage },
    handleCoverImageCrop,
  ] = useCropper();
  // mutation
  const { mutate } = useUpdateConcert({ onSuccess: () => closeModal() });
  const params: { concertId: string } = useParams();
  const onSubmit = () => {
    mutate({
      id: params.concertId,
      coverUrl: coverImageDataUrl ? coverImage : undefined,
    });
  };

  return (
    <DialogCustom
      variant="standard"
      title="カバー写真"
      open={isModalOpen}
      onClose={closeModal}
      yesButtonProps={{ onClick: onSubmit }}
      maxWidth="sm"
    >
      <FormImageField
        imageUrl={coverImageDataUrl ?? imageNotFound}
        label="カバー写真"
        margin="normal"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ accept: 'image/png, image/jpeg' }}
        onChange={handleTransmitCoverImage}
        cropperProps={{
          aspectRatio: 3 / 1,
          crop: handleCoverImageCrop,
        }}
        cropperRef={coverCropperRef}
      />
    </DialogCustom>
  );
};
