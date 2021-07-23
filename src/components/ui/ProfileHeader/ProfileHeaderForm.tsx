import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';
import imageNotFound from '../../../assets/imageNotFound.jpeg';
import musicNote from '../../../assets/musicNote.png';
import { User } from '../../../containers/controllers/user/useFetchUserInfo';
import { useUpdateUserProfile } from '../../../containers/controllers/user/useUpdateUserProfile';
import { QUERY } from '../../../containers/entities/query';
import { useCropper } from '../../../utility/hooks/useCropper';
import { useImageTransmit } from '../../../utility/hooks/useImageTransmit';
import { useToggle } from '../../../utility/hooks/useToggle';
import { yupLocaleJP } from '../../../utility/yupLocaleJP';
import { CoverImage } from '../../helpers/CoverImage/CoverImage';
import { DialogCustom } from '../../helpers/DialogCustom/DialogCustom';
import { FormImageField } from '../../helpers/FormTextField/FormImageField';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';

interface Props {
  displayName: string;
  photoURL: string;
}

interface FormValues {
  displayName?: string;
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  displayName: yup.string().min(1).max(30),
});

export const ProfileHeaderForm: React.VFC<Props> = ({
  displayName,
  photoURL,
}) => {
  const queryClient = useQueryClient();
  const userInfo: User | undefined = queryClient.getQueryData([QUERY.user]);
  const [isDialogOpen, toggleIsDialogOpen] = useToggle(false);
  const [{ imageDataUrl }, handleTransmitImage] = useImageTransmit();
  const [{ cropperRef, croppedFile }, handleCrop] = useCropper();
  const { mutate } = useUpdateUserProfile();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    mutate({ displayName: data?.displayName ?? '', image: croppedFile });
  });

  return (
    <>
      <CoverImage
        title={displayName}
        image={musicNote}
        avatar={photoURL}
        editModal={() => toggleIsDialogOpen(true)}
        editLabel="プロフィールを編集"
      />
      <DialogCustom
        variant="standard"
        title="プロフィールの編集"
        open={isDialogOpen}
        onClose={() => toggleIsDialogOpen(false)}
        yesButtonProps={{
          onClick: onSubmit,
        }}
      >
        <form>
          <FormTextField
            control={control}
            name="displayName"
            margin="normal"
            fullWidth
            label="名前"
            defaultValue={userInfo?.displayName ?? ''}
            errorMessage={errors.displayName?.message}
          />
          <FormImageField
            imageUrl={imageDataUrl ?? imageNotFound}
            isCircle
            fullWidth
            label="プロフィール画像"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ accept: 'image/png, image/jpeg' }}
            onChange={handleTransmitImage}
            cropperProps={{ crop: handleCrop }}
            cropperRef={cropperRef}
          />
        </form>
      </DialogCustom>
    </>
  );
};
