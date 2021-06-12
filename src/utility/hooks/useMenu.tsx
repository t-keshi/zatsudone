import { ChangeEvent, useState } from "react";

interface ReturnType {
  anchorEl: null | HTMLButtonElement;
  isMenuOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleMenuOpen: (e: ChangeEvent<any>) => void;
  handleMenuClose: () => void;
}

export const useMenu = (): ReturnType => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const isMenuOpen = anchorEl !== null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuOpen = (e: ChangeEvent<any>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return { anchorEl, isMenuOpen, handleMenuOpen, handleMenuClose };
};
