
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
// import { usePathname } from 'next/navigation';
import NextLink from 'next/link'
import { getAllCategory } from 'apis/category.api';


// ----------------------------------------------------------------------
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { alpha } from '@mui/material/styles';
import { AppBar, Link, List, ListItem, Tab, Tabs, Toolbar } from '@mui/material';

const NewsLeftCategoryStyleComponents = () => {
    const [activeLink, setActiveLink] = useState('');

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            const res = await getAllCategory()
            setCategories(res?.data)
            return (res?.data)
        }
        getCategory()
    }, [])


    // const activeRootStyle = {
    //     color: 'primary.main',
    //     fontWeight: 'fontWeightMedium',
    //     bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    //     '&:before': { display: 'block' }
    // };

    {/* Get the current route */ }
    // useEffect(() => {
    //     return currentRoute = usePathname();
    //     console.log('currentRoute', currentRoute);
    // }, [usePathname])

    console.log('categories', categories);

    return (
        <>

            {categories?.length >= 0 ? (
                <nav style={{ marginTop: '0px', position: 'sticky', top: '150px' }}>
                    <List component="ul" sx={{ marginTop: '0px' }}>
                        <ListItem
                            sx={{
                                padding: '0px',
                                marginBottom: '2px',
                            }}
                            component="li"
                        >
                            <Link
                                sx={{
                                    padding: '10px',
                                    width: '100%',
                                    height: 'auto',
                                    color: '#000',
                                    fontSize: '15px',
                                    fontWeight: 'medium',
                                    '&:hover': {
                                        color: '#616161',
                                        transition: '.4s',
                                        textDecoration: 'none',
                                    },
                                }}
                                href={`/home`}
                            >
                                Home
                            </Link>
                        </ListItem>
                        {categories?.map((ct, i) => (
                            <ListItem
                                sx={{
                                    padding: '0px',
                                    marginBottom: '2px',
                                }}
                                component="li"
                                key={i} // Don't forget to include a unique key for each mapped element
                            >
                                <Link
                                    sx={{
                                        padding: '10px',
                                        width: '100%',
                                        height: 'auto',
                                        color: '#000',
                                        fontSize: '15px',
                                        fontWeight: 'medium',
                                        '&:hover': {
                                            color: '#616161',
                                            transition: '.4s',
                                            textDecoration: 'none',
                                        },
                                    }}
                                    href={`/${ct?.categoryLink}`}
                                >
                                    {ct?.categoryName}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: '0.25rem' }}>• • •</Divider>
                </nav>
            ) : (
                <>
                    <h1>You Don't have any Category for link</h1>
                </>
            )}



            {/* <ListItem
                            key={i}
                            sx={{
                                padding: '0px',
                                marginBottom: '2px',
                            }}
                            component="li"
                        >
                            <Link sx={{
                                padding: '10px', width: '100%', height: 'auto', color: '#000', fontSize: '15px', fontWeight: 'medium', '&:hover': {
                                    color: '#616161',
                                    transition: '.4s',
                                    textDecoration: 'none',
                                }
                            }} href={`/${ct?.categoryLink}`}>
                                {ct?.categoryName}
                            </Link>
                        </ListItem> */}







        </>
    )
}

export default NewsLeftCategoryStyleComponents