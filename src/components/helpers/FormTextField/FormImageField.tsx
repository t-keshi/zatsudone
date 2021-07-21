import { TextField, TextFieldProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'cropperjs/dist/cropper.css';
import React from 'react';
import Cropper, { ReactCropperElement, ReactCropperProps } from 'react-cropper';

interface StyleProps {
  isCircle?: boolean;
}

interface Props extends StyleProps {
  imageUrl: string;
  cropperProps?: ReactCropperProps;
  cropperRef: React.RefObject<ReactCropperElement>;
}

const CROPPER_HEIGHT = 380;

const useStyles = makeStyles((theme) => ({
  cropperWrapper: {
    marginTop: theme.spacing(2),
    height: CROPPER_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cropperWidth: {
    height: CROPPER_HEIGHT,
    width: '100%',
    '& img': {
      objectFit: 'contain',
    },
    '& .cropper-crop-box': {
      borderRadius: ({ isCircle }: StyleProps) => (isCircle ? '50%' : 0),
    },
    '& .cropper-view-box': {
      borderRadius: ({ isCircle }: StyleProps) => (isCircle ? '50%' : 0),
      boxShadow: `0 0 0 1px ${theme.palette.secondary.main}`,
      outline: 0,
    },
  },
}));

export const FormImageField: React.VFC<Props & TextFieldProps> = ({
  imageUrl,
  isCircle = false,
  cropperProps,
  cropperRef,
  ...rest
}) => {
  const classes = useStyles({ isCircle });

  return (
    <>
      <TextField
        type="file"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      <div className={classes.cropperWrapper}>
        {/* <div className={classes.cropperWidth}> */}
        <Cropper
          className={classes.cropperWidth}
          src={imageUrl}
          aspectRatio={1}
          viewMode={1}
          guides={false}
          zoomOnWheel={false}
          ref={cropperRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...cropperProps}
        />
        {/* </div> */}
      </div>
    </>
  );
};
