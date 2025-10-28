import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AbcIcon from '@mui/icons-material/Abc';
import { useNavigate } from 'react-router';
import AccountModal from './AccountModal';

const pages = ['Home', 'Products', 'Customers'];
const settings = ['Account', 'Logout'];

function Navbar({ setFeature }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = React.useState(false);

  const handleAccountClick = () => {
    handleCloseUserMenu();
    setIsAccountModalOpen(true);
  };

  const handleCloseAccountModal = () => {
    setIsAccountModalOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    navigate('/login', { replace: true });
  };

  const handleSettingClick = (setting) => {
    if (setting === 'Logout') {
      handleLogout();
    } else if (setting === 'Account') {
      handleAccountClick();
    } else {
      handleCloseUserMenu();
    }
  };

  const handlePageClick = (page) => {
    handleCloseNavMenu();
    setFeature(page);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AbcIcon
            aria-label='logo'
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              bgcolor: 'orange',
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='hamburger-menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon data-testid='MenuIcon' />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AbcIcon
            aria-label='logo'
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 1,
              bgcolor: 'orange',
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton
                aria-label='user-avatar'
                aria-controls='user-menu'
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar alt='user image' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              {settings.map((setting) => (
                <MenuItem
                  id='user-menu'
                  key={setting}
                  onClick={() => handleSettingClick(setting)}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* User account */}
      <AccountModal
        open={isAccountModalOpen}
        onClose={handleCloseAccountModal}
      />
    </AppBar>
  );
}
export default Navbar;
