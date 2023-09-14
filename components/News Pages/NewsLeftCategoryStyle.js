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

            {/* <Paper elevation={3} style={{ width: 200 }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={activeTab}
                    onChange={handleTabChange}
                >
                    <Tab icon={<HomeIcon />} />
                    <Tab label="Contact" />
                    <Tab label="About" />
                    <Tab label="Sports" />
                    <Tab label="Game" />
                    <Tab label="Show" />
                </Tabs>

            </Paper> */}

            <Paper elevation={3} >
                <List>
                    <NextLink href="/" passHref>
                        <ListItem
                            button
                            style={{
                                backgroundColor: isActive('/') ? 'lightblue' : 'inherit',
                            }}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </NextLink>
                    <NextLink href="/contact" passHref>
                        <ListItem
                            button
                            style={{
                                backgroundColor: isActive('/contact') ? 'lightblue' : 'inherit',
                            }}
                        >
                            <ListItemText primary="Contact" />
                        </ListItem>
                    </NextLink>
                    <NextLink href="/about" passHref>
                        <ListItem
                            button
                            style={{
                                backgroundColor: isActive('/about') ? 'lightblue' : 'inherit',
                            }}
                        >
                            <ListItemText primary="About" />
                        </ListItem>
                    </NextLink>
                    {/* Add more list items with NextLink */}
                </List>
            </Paper>
        </>
    )
}

export default NewsLeftCategoryStyleComponents