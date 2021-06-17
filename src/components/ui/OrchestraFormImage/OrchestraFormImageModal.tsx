import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useUploadCoverImage } from '../../../containers/api/orchestra/useUploadCoverImage';
import { useImageUpload } from '../../../utility/hooks/useImageUpload';
import { ModalCustom } from '../../helpers/ModalCustom/ModalCustom';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CROPPER_WIDTH = 400;
const CROPPER_HEIGHT = 400;

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: 'contain',
    height: CROPPER_HEIGHT,
    width: '100%',
  },
  cropperWrapper: {
    marginTop: theme.spacing(2),
    minHeight: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropperWidth: {
    maxWidth: CROPPER_WIDTH,
  },
}));

export const OrchestraFormImageModal: React.VFC<Props> = ({
  isModalOpen,
  closeModal,
}) => {
  const classes = useStyles();
  const cropperRef = useRef<ReactCropperElement>(null);
  const [_, fileName, imageUrl, handleUploadImage] = useImageUpload();
  const { mutate } = useUploadCoverImage();
  const onSubmit = () => {
    const dataUrl = cropperRef.current?.cropper
      .getCroppedCanvas()
      .toDataURL('image/jpeg');
    mutate({ imageName: fileName, imageDataUrl: dataUrl ?? '' });
  };

  return (
    <ModalCustom
      variant="standard"
      title="カバー写真"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      yesButtonProps={{ onClick: onSubmit }}
      noButtonProps={{ onClick: closeModal }}
      modalWidth={500}
    >
      <Box>
        <TextField
          type="file"
          onChange={handleUploadImage}
          inputProps={{ accept: 'image/png, image/jpeg' }}
        />
        <Box className={classes.cropperWrapper}>
          <Box className={classes.cropperWidth}>
            <Cropper
              src={imageUrl}
              aspectRatio={3 / 1}
              guides={false}
              zoomOnWheel={false}
              minContainerWidth={CROPPER_WIDTH}
              minContainerHeight={CROPPER_HEIGHT}
              ref={cropperRef}
            />
          </Box>
        </Box>
      </Box>
    </ModalCustom>
  );
};
