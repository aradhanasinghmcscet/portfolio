import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Home as HomeIcon, School as SchoolIcon, Work as WorkIcon, Code as CodeIcon, Mail as MailIcon, Analytics as AnalyticsIcon, Games as ChessIcon } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, isScrolled }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems: MenuItem[] = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Projects', icon: <CodeIcon />, path: '/projects' },
    { text: 'Skills', icon: <SchoolIcon />, path: '/skills' },
    { text: 'Experience', icon: <WorkIcon />, path: '/experience' },
    { text: 'Chess', icon: <ChessIcon />, path: '/chess' },
    { text: 'Contact', icon: <MailIcon />, path: '/contact' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const clickCount = useSelector((state: RootState) => state.clickCounter.count);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          background: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar>
          <Typography className="navbar__logo" variant="h1" component="div" sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
            fontSize: '1.5rem',
            fontStyle: 'italic',
            fontVariant: 'petite-caps'
          }}>
            Aradhana
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Clicks: {clickCount}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={() => handleScrollToSection(item.path.slice(1))}
                startIcon={item.icon}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 1,
                  },
                  color: activeSection === item.path.slice(1) ? 'white' : 'inherit',
                  fontWeight: activeSection === item.path.slice(1) ? 'bold' : 'normal',
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                onClick={() => {
                  handleScrollToSection(item.path.slice(1));
                  handleDrawerToggle();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;