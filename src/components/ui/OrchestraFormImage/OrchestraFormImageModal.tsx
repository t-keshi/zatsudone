import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Tab, Tabs } from '@material-ui/core';
import 'cropperjs/dist/cropper.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import imageNotFound from '../../../assets/imageNotFound.jpeg';
import { useUploadCoverImage } from '../../../containers/controllers/orchestra/useUploadCoverImage';
import { useCropper } from '../../../utility/hooks/useCropper';
import { useImageTransmit } from '../../../utility/hooks/useImageTransmit';
import { useTab } from '../../../utility/hooks/useTab';
import { yupLocaleJP } from '../../../utility/yupLocaleJP';
import { DialogCustom } from '../../helpers/DialogCustom/DialogCustom';
import { FormImageField } from '../../helpers/FormTextField/FormImageField';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { SwipeableViewsCustom } from '../../helpers/SwipeableViewsCustom/SwipeableViewsCustom';
import { TabPanel } from '../../helpers/TabPanel/TabPanel';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  name: string;
  orchestraId: string;
}

yup.setLocale(yupLocaleJP);

interface FormValues {
  name: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  name: yup.string().min(1).max(30).required(),
});

export const OrchestraFormImageModal: React.VFC<Props> = ({
  isModalOpen,
  closeModal,
  name,
  orchestraId,
}) => {
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();
  // coverImage
  const [{ imageDataUrl: coverImageDataUrl }, handleTransmitCoverImage] =
    useImageTransmit();
  const [
    { cropperRef: coverCropperRef, croppedFile: coverImage },
    handleCoverImageCrop,
  ] = useCropper();
  // avatar
  const [{ imageDataUrl: avatarImageDataUrl }, handleTransmitAvatarImage] =
    useImageTransmit();
  const [
    { cropperRef: avatarCropperRef, croppedFile: avatarImage },
    handleAvatarImageCrop,
  ] = useCropper();
  // mutation
  const { mutate } = useUploadCoverImage({ onSuccess: () => closeModal() });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    mutate({
      name: data.name,
      orchestraId,
      avatarImage: avatarImageDataUrl ? avatarImage : undefined,
      coverImage: coverImageDataUrl ? coverImage : undefined,
    });
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
          name="name"
          margin="normal"
          fullWidth
          label="のタイトル"
          defaultValue={name}
          errorMessage={errors.name?.message}
        />
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab label="楽団アバター" />
          <Tab label="カバー写真" />
        </Tabs>
        <SwipeableViewsCustom
          index={tabIndex}
          onChangeIndex={handleChangeTabBySwipe}
        >
          <TabPanel value={tabIndex} index={0} gutter={false} unmountOnSwitch>
            <FormImageField
              imageUrl={avatarImageDataUrl ?? imageNotFound}
              label="楽団アバター"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ accept: 'image/png, image/jpeg' }}
              onChange={handleTransmitAvatarImage}
              cropperProps={{
                crop: handleAvatarImageCrop,
              }}
              cropperRef={avatarCropperRef}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={1} gutter={false} unmountOnSwitch>
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
          </TabPanel>
        </SwipeableViewsCustom>
      </Box>
    </DialogCustom>
  );
};
