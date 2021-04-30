import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';

interface Props {
  handleClose: () => void;
  anchorEl: null | HTMLButtonElement;
}

export const HeaderMenu: React.VFC<Props> = ({ handleClose, anchorEl }) => (
  <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem>
    <MenuItem onClick={handleClose}>Logout</MenuItem>
  </Menu>
);
