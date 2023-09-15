import { useState } from 'react';
import { AppBar, List, ListItem, ListItemIcon, ListItemText, Paper, Tab, Tabs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import NextLink from 'next/link'

// ----------------------------------------------------------------------


const NewsLeftCategoryStyleComponents = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const router = useRouter();

    const isActive = (pathname) => {
        return router.pathname === pathname;
    };

    return (
        <>
        <Paper elevation={3} >
            <List>
                <NextLink href="/" passHref>
                    <ListItem
                        button
                        style={{
                            backgroundColor: isActive('/') ? '#011e29' : 'inherit',
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon sx={{color:'#fff'}}/>
                        </ListItemIcon>
                        <ListItemText secondary="Home" color='#fff' />
                    </ListItem>
                </NextLink>
                <NextLink href="/জনপ্রিয়" passHref>
                    <ListItem
                        button
                        style={{
                            backgroundColor: isActive('/জনপ্রিয়') ? 'lightblue' : 'inherit',
                        }}
                    >
                        <ListItemText primary="জনপ্রিয়" />
                    </ListItem>
                </NextLink>
                <NextLink href="/এক নজরে সব খবর" passHref>
                    <ListItem
                        button
                        style={{
                            backgroundColor: isActive('/এক নজরে সব খবর') ? 'lightblue' : 'inherit',
                        }}
                    >
                        <ListItemText primary="এক নজরে সব খবর" />
                    </ListItem>
                </NextLink>
                {/* Add more list items with NextLink */}
            </List>
        </Paper>
        </>
    )
}

export default NewsLeftCategoryStyleComponents