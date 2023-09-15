import AdPositioning1Components from '@/components/AdPositioning/AdPositioning1';
import BlogNavComponents from '@/components/News Pages/BlogNav';
import NewsDataCardComponents from '@/components/News Pages/NewsDataCard';
import NewsLayout from '@/components/News Pages/NewsLayout'
import NewsLeftCategoryStyleComponents from '@/components/News Pages/NewsLeftCategoryStyle';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router'
import React from 'react'

const CategoryPage = () => {
    const router = useRouter()
    const {category} = router.query;
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isTabletScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    return (
        <>
            <NewsLayout>
                <h1>Hello category page:: {category}</h1>
            </NewsLayout>
        </>
    )
}

export default CategoryPage