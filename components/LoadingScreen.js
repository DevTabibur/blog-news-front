import NProgress from 'nprogress';
import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Container, GlobalStyles } from '@mui/material';
import { Router } from 'next/router';
//
// import Logo from './Logo';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    height: '100vh', // Use viewport height to make it full-screen
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export function ProgressBarStyle() {
    const theme = useTheme();

    return (
        <GlobalStyles
            styles={{
                '#nprogress': {
                    pointerEvents: 'none',
                    '& .bar': {
                        top: 0,
                        left: 0,
                        height: 2,
                        width: '100%',
                        position: 'fixed',
                        zIndex: theme.zIndex.snackbar,
                        backgroundColor: theme.palette.primary.main,
                        boxShadow: `0 0 2px ${theme.palette.primary.main}`
                    },
                    '& .peg': {
                        right: 0,
                        opacity: 1,
                        width: 100,
                        height: '100%',
                        display: 'block',
                        position: 'absolute',
                        transform: 'rotate(3deg) translate(0px, -4px)',
                        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
                    }
                }
            }}
        />
    );
}

Router.events.on('routeChangeStart', () => {
    NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
});

Router.events.on('routeChangeError', () => {
    NProgress.done();
});

function ProgressBar() {
    useEffect(() => {
        // Make sure to stop NProgress when the component unmounts
        return () => {
            NProgress.done();
        };
    }, []);

    return null;
}

export default function LoadingScreen({ ...other }) {
    return (
        <>
            <ProgressBar />
            <Container>
                <RootStyle {...other}>
                    <motion.div
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 360 }}
                        transition={{
                            duration: 2,
                            ease: 'easeInOut',
                            repeatDelay: 1,
                            repeat: Infinity
                        }}
                    >
                        <p>LOGO</p>
                        {/* <Logo sx={{ width: 64, height: 64 }} /> */}
                    </motion.div>

                    <Box
                        component={motion.div}
                        animate={{
                            scale: [1.2, 1, 1, 1.2, 1.2],
                            rotate: [270, 0, 0, 270, 270],
                            opacity: [0.25, 1, 1, 1, 0.25],
                            borderRadius: ['25%', '25%', '50%', '50%', '25%']
                        }}
                        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '25%',
                            position: 'absolute',
                            border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`
                        }}
                    />

                    <Box
                        component={motion.div}
                        animate={{
                            scale: [1, 1.2, 1.2, 1, 1],
                            rotate: [0, 270, 270, 0, 0],
                            opacity: [1, 0.25, 0.25, 0.25, 1],
                            borderRadius: ['25%', '25%', '50%', '50%', '25%']
                        }}
                        transition={{
                            ease: 'linear',
                            duration: 3.2,
                            repeat: Infinity
                        }}
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: '25%',
                            position: 'absolute',
                            border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`
                        }}
                    />
                </RootStyle>
            </Container>


        </>
    );
}
