import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useUploadCoverImage } from '../../../containers/controllers/orchestra/useUploadCoverImage';
import { useImageTransmit } from '../../../utility/hooks/useImageTransmit';
import { DialogCustom } from '../../helpers/DialogCustom/DialogCustom';

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
  const [{ imageName, imageDataUrl }, handleUploadImage] = useImageTransmit();
  const { mutate } = useUploadCoverImage();
  const onSubmit = () => {
    mutate({ imageName, imageDataUrl: imageDataUrl as string });
  };

  return (
    <DialogCustom
      variant="standard"
      title="カバー写真"
      open={isModalOpen}
      onClose={closeModal}
      yesButtonProps={{ onClick: onSubmit }}
      noButtonProps={{ onClick: closeModal }}
      maxWidth="sm"
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
              src={imageDataUrl}
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
    </DialogCustom>
  );
};
