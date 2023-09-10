import { Icon } from '@iconify/react';
// import { useSnackbar } from 'notistack';
import { useContext, useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
// import useAuth from 'hooks/useAuth';
// import useIsMountedRef from 'hooks/useIsMountedRef';
// components
import MIconButton from 'components/@material-extend/MIconButton';
// import MyAvatar from 'components/MyAvatar';
import MenuPopover from 'components/MenuPopover';
import { ContextData } from 'contexts/dataProviderContext';
import { toast } from 'react-hot-toast';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: homeFill,
        linkTo: '/'
    },
    {
        label: 'Profile',
        icon: personFill,
        linkTo: PATH_DASHBOARD.user.profile
    },
    {
        label: 'Settings',
        icon: settings2Fill,
        linkTo: PATH_DASHBOARD.user.account
    }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const anchorRef = useRef(null)
    const { currentlyLoggedIn, setUpdate } = useContext(ContextData)
    // const { role, email, name, image } = currentlyLoggedIn || {}
    const image = `https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png`;
    const name = 'ACcoutn NAme Popover';
    const role = 'Admin';
    const email = `dummy@gmail.com`;
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        const url = `http://localhost:8000/api/v1/auth/log-out/${currentlyLoggedIn?._id}`
        fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
            ,
            body: JSON.stringify({ userId: currentlyLoggedIn?._id })
        })
            .then(res => res.json())
            .then(data => {
                // console.log('log out data', data);
                if (data.statusCode === 200) {
                    localStorage.removeItem("accessToken");
                    toast.success(data?.message)

                    router.push("/");
                    window.location.reload()
                }
            })

    };

    return (
        <>
            <MIconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: theme => alpha(theme.palette.grey[900], 0.72),
                        },
                    }),
                }}
            >
                <Avatar
                    alt="My Avatar"
                    src="/static/mock-images/avatars/avatar_default.jpg"
                />
            </MIconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap>
                        {name?.firstName} {name?.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {email}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <NextLink href={'/'}>
                    <MenuItem
                        onClick={handleClose}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        <HomeOutlinedIcon className="mr-3" />
                        Home
                    </MenuItem>
                </NextLink>

                <NextLink href={'/dashboard/user/account/'}>
                    <MenuItem
                        onClick={handleClose}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        <PersonOutlineOutlinedIcon className="mr-3" />
                        My Account
                    </MenuItem>
                </NextLink>
                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button
                        onClick={handleLogout}
                        fullWidth
                        color="inherit"
                        variant="outlined"
                    >
                        Logout
                    </Button>
                </Box>
            </MenuPopover>
        </>
    )
}