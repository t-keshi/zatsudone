import React from 'react';
import { useForm } from 'react-hook-form';
import musicNote from '../../../assets/musicNote.png';
import { useToggle } from '../../../utility/hooks/useToggle';
import { CoverImage } from '../../helpers/CoverImage/CoverImage';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { DialogCustom } from '../../helpers/ModalCustom/DialogCustom';

interface FormValues {
  displayName: string;
  coverImageURL: string;
  photoURL: string;
  instrument: string;
}

export const ProfileHeader: React.VFC = () => {
  const [isDialogOpen, toggleIsDialogOpen] = useToggle(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <CoverImage
        title="a"
        image={musicNote}
        avatar={musicNote}
        editModal={() => toggleIsDialogOpen(true)}
      />
      <DialogCustom
        variant="standard"
        title="プロフィール基本情報の編集"
        open={isDialogOpen}
        onClose={() => toggleIsDialogOpen(false)}
        yesButtonProps={{
          onClick: onSubmit,
        }}
      >
        <form>
          <FormTextField
            control={control}
            name="instrument"
            errorMessage={errors.instrument?.message}
          />
          <FormTextField
            control={control}
            name="displayName"
            errorMessage={errors.displayName?.message}
          />
        </form>
      </DialogCustom>
    </>
  );
};
