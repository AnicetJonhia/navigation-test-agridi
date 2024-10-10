import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { InputBase } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/profile/avatar.png';
import Logout from "./Logout.tsx";

import { BorderBeam } from "@/components/ui/border-beam";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#171717',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1C2226',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '64px', // Juste en bas de la Navbar
  right: '0', // Aligné à droite
  width: '300px',
  bgcolor: '#171717',
  color: 'white',
  boxShadow: 24,
  p: 2,
  borderRadius: '8px',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  opacity: 0.95, // Opacité du modal
  zIndex: 20, // S'assurer que le modal soit au-dessus du backdrop
};

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
};

// @ts-ignore
export default function Navbar({ toggleSidebar }) {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ flexGrow: 1, borderBottom: '1px solid #A1A1A1', position: 'relative' }}>
      <AppBar position="static" sx={{ backgroundColor: '#171717' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex flex-row items-center gap-2 mr-4">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1 }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo et titre */}
            <div className="flex flex-row gap-1 items-center">
              <img src={logo} alt="Agri-Di logo" className="w-6 h-6" />
              <p className="text-[24px] leading-6 font-inter font-[400] text-white">AgriD</p>
            </div>
          </div>

          {/* Barre de recherche */}
          <Search sx={{ flexGrow: 1, maxWidth: '400px', marginLeft: '20px' }}>
            <SearchIcon />
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          {/* Icônes de notification et de profil */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              onClick={handleOpenModal}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Backdrop pour le modal */}
      {openModal && <Box sx={backdropStyle} onClick={handleCloseModal} />}

      {/* Modal personnalisé positionné à droite sous la Navbar */}
      {openModal && (
          <Box
              sx={{ ...modalStyle, transform: openModal ? 'translateY(0)' : 'translateY(-20px)', opacity: 0.95 , right:"5px"  }}
              onClick={(e) => e.stopPropagation()} // Éviter que les clics sur le modal ferment le modal
          >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar alt="" src={avatar} />
                      <Typography variant="h6">John Doe</Typography>
                  </Box>
                  <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
                      <CloseIcon />
                  </IconButton>
              </Box>

              <Button
                  startIcon={<PersonIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', color: 'white', mb: 1 }}
                  onClick={(e) => e.stopPropagation()} // Assurez-vous que ce clic n'affecte pas le backdrop
              >
                  Profile
              </Button>
              <Logout />

            <BorderBeam size={250} duration={12} delay={9} />

          </Box>
      )}
    </Box>
  );
}
