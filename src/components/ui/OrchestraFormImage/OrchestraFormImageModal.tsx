import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUploadCoverImage } from '../../../containers/controllers/orchestra/useUploadCoverImage';
import { useImageTransmit } from '../../../utility/hooks/useImageTransmit';
import { useTab } from '../../../utility/hooks/useTab';
import { DialogCustom } from '../../helpers/DialogCustom/DialogCustom';
import { FormImageField } from '../../helpers/FormTextField/FormImageField';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { SwipeableViewsCustom } from '../../helpers/SwipeableViewsCustom/SwipeableViewsCustom';
import { TabPanel } from '../../helpers/TabPanel/TabPanel';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}

interface FormValues {
  title: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  title: yup.string().min(1).max(30).required(),
});

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
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();
  const [{ imageDataUrl: coverImageDataUrl }, handleTransmitCoverImage] =
    useImageTransmit();
  const [{ imageDataUrl: avatarImageDataUrl }, handleTransmitAvatarImage] =
    useImageTransmit();
  const { mutate } = useUploadCoverImage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit(() => {
    mutate({ imageName: 'hoge', imageDataUrl: coverImageDataUrl as string });
  });

  return (
    <DialogCustom
      variant="standard"
      title="カバー写真"
      open={isModalOpen}
      onClose={closeModal}
      yesButtonProps={{ onClick: onSubmit }}
      maxWidth="sm"
    >
      <Box>
        <FormTextField
          control={control}
          name="title"
          margin="normal"
          fullWidth
          label="演奏会のタイトル"
          defaultValue="hoge"
          errorMessage={errors.title?.message}
        />
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab label="カバー写真" />
          <Tab label="楽団アバター" />
        </Tabs>
        <SwipeableViewsCustom
          index={tabIndex}
          onChangeIndex={handleChangeTabBySwipe}
        >
          <TabPanel value={tabIndex} index={0}>
            <FormImageField
              imageUrl={coverImageDataUrl ?? ''}
              label="プロフィール画像"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ accept: 'image/png, image/jpeg' }}
              onChange={handleTransmitCoverImage}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <FormImageField
              imageUrl={avatarImageDataUrl ?? ''}
              label="プロフィール画像"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ accept: 'image/png, image/jpeg' }}
              onChange={handleTransmitAvatarImage}
            />
          </TabPanel>
        </SwipeableViewsCustom>
      </Box>
    </DialogCustom>
  );
};
