import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {blueGrey} from '@mui/material/colors'
import { Divider } from '@mui/material';
import { Button, MenuList } from '@mui/material';
import Modal from '@mui/material/Modal';
import { GoogleLogin } from '@react-oauth/google';
import SearchIcon from '@mui/icons-material/Search';
import WorkSharpIcon from '@mui/icons-material/WorkSharp';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import FavoriteIcon from "@mui/icons-material/Favorite";
const responseGoogle = (response: any) => {
  console.log(response);
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLoggedin, setisLoggedin] = useState(false)
  const [product, setProductList] = useState([{}]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutHandler = () => {
    googleLogout();
    console.log("Logout Succesful");

  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//testing for github
  return (
    <AppBar position="static" sx={{bgcolor:blueGrey[500]}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 2 }}>
          <SearchIcon />

</IconButton>
<IconButton sx={{ p: 2 }}>
  <FavoriteIcon />
</IconButton>
<IconButton sx={{ p: 2 }}>
  <WorkSharpIcon />
</IconButton>
<IconButton>
   <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Sorting"
    
  >
    <MenuItem value={10}>From A-Z</MenuItem>
    <MenuItem value={20}>From Z-A</MenuItem>
    <MenuItem value={30}>From Higher to Lower</MenuItem>
    <MenuItem value={30}>From Lower to Higher</MenuItem>
  </Select>
      </IconButton>
            <Tooltip title="Open settings">
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="https://lh3.googleusercontent.com/a/AEdFTp5V--9zDVtfnT4DfPU5umgVW1EsN6JZfJ8Bv_sb=s96-c"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={handleCloseUserMenu}>
              <MenuList>
              <Typography><Button>My Profile</Button></Typography>
              <Typography><Button>Wishlist</Button></Typography>
              <Typography><Button>Cart</Button><Divider /></Typography>
              
              <Button onClick={handleOpen}>Login</Button>
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
              
              <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse.credential);
                if(credentialResponse.credential!== undefined){
                var decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded)
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /> 
              </Box>
              </Modal>
              <Typography><Button onClick={logoutHandler}>Logout</Button></Typography>
              </MenuList>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
              
      </Container>
    </AppBar>
  );
}
export default Navbar;