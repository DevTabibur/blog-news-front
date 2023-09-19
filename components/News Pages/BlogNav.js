// mui material
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    useMediaQuery,
    Box,
    Container,
    Grid,
    Paper,
} from '@mui/material';
// Import debounce function
import debounce from 'lodash/debounce';
// icon
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { DateTime } from 'luxon';
// components
import LogoImage from '../../assets/images/hindusthanTimes Bangla Logo.svg'
import { useEffect, useState } from 'react';
import Image from 'next/image';

// custom container
// const useStyles = styled((theme) => ({
//     // container: {
//     //     padding: theme.spacing(2),
//     //     textAlign: 'center',
//     //     fontSize: '24px',
//     //     color: '#011e29',
//     // },
//     // containerSmallScreen: {
//     //     backgroundColor: '#011e29',
//     // },
//     // containerLargeScreen: {
//     //     backgroundColor: '#011e29',
//     // },
// }));


const BlogNavComponents = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    // for app bar height decrease according to scrolling down
    const [appBarHeight, setAppBarHeight] = useState(130);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 100) {
    //             setAppBarHeight(100);
    //         } else {
    //             setAppBarHeight(130);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={4}
                sx={{ backgroundColor: '#fff', height: appBarHeight, marginBottom: '70px', transition: 'height 0.3s ease', }}
            >
                <Container
                    sx={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        height: appBarHeight,
                        ms: '0px',
                        me: '0px'
                    }}
                >
                    <Box
                        sx={{
                            width: '33.3%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            onClick={toggleDrawer}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ color: 'black' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>


                    <Box

                        sx={{
                            width: '33.3%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            src={LogoImage}
                            alt="Your Logo"
                            width={isMobile ? 100 : 150}
                            height={isMobile ? 'auto' : 140}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '33.3%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton>
                                    <SearchIcon color="primary" />
                                </IconButton>
                                {!isMobile && (
                                    <>
                                        <IconButton>
                                            <FacebookIcon style={{ color: '#1877F2' }} />
                                        </IconButton>
                                        <IconButton>
                                            <TwitterIcon style={{ color: '#1DA1F2' }} />
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                            {!isMobile && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2">
                                        {DateTime.now().toLocaleString(DateTime.DATETIME_MED)}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Container>

                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    <div style={{ width: 250 }}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="Menu Item 1" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="Menu Item 2" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </AppBar>






        </>

    );

}

export default BlogNavComponents
