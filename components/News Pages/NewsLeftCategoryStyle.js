import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
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
import { Link } from '@mui/material';

const NewsLeftCategoryStyleComponents = () => {
    const router = useRouter();

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

    // const activeSubStyle = {
    //     color: 'text.primary',
    //     fontWeight: 'fontWeightMedium'
    // };

    const isActive = (pathname) => {
        return router.asPath === pathname;
    };
    // Define the active background color
    const activeBgColor = 'orange';


    return (
        <>

            {categories?.length === 0 && `You don't have any Category menu`}
            <MenuList>
                {categories.map((item, index) => (
                    <NextLink href={item.categoryLink} passHref key={index} >
                        <MenuItem>
                            <ListItemText primary={item.categoryName} sx={{
                                backgroundColor: router.asPath === item.categoryLink ? activeBgColor : 'transparent',
                            }} />
                        </MenuItem>
                    </NextLink>
                ))}
                <Divider sx={{ my: '0.25rem' }}>• • •</Divider>
            </MenuList>





        </>
    )
}

export default NewsLeftCategoryStyleComponents