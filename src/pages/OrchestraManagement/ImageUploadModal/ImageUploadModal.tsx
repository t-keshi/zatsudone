import { Box, Button, Modal, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useUploadCoverImage } from '../../../containers/api/orchestra/useUploadCoverImage';
import { useImageUpload } from '../../../helpers/hooks/useImageUpload';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}

const useStyles = makeStyles(() => ({
  modal: { alignItems: 'center', justifyContent: 'center' },
  modalContents: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '95%',
    maxWidth: '500px',
    transform: 'translate(-50%, -50%)',
  },
}));

export const ImageUploadModal: React.VFC<Props> = ({
  isModalOpen,
  closeModal,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const classes = useStyles();
  const [_, fileName, imageUrl, handleUploadImage] = useImageUpload();
  const { mutate } = useUploadCoverImage();
  const onSubmit = () => {
    const dataUrl = cropperRef.current?.cropper
      .getCroppedCanvas()
      .toDataURL('image/jpeg');
    mutate({ imageName: fileName, imageDataUrl: dataUrl ?? '' });
  };

  return (
    <Modal className={classes.modal} open={isModalOpen} onClose={closeModal}>
      <Paper className={classes.modalContents}>
        <Box p={3}>
          <TextField
            type="file"
            onChange={handleUploadImage}
            inputProps={{ accept: 'image/png, image/jpeg' }}
          />
          <Box
            mt={2}
            minHeight="60vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box maxWidth={400}>
              <Cropper
                src={imageUrl}
                aspectRatio={3 / 1}
                guides={false}
                zoomOnWheel={false}
                minContainerWidth={400}
                minContainerHeight={400}
                ref={cropperRef}
              />
            </Box>
          </Box>
          <Button onClick={onSubmit}>SUBMIT</Button>
        </Box>
      </Paper>
    </Modal>
  );
};
