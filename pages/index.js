import React, { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import BlogNavComponents from '@/components/News Pages/BlogNav';
import AdPositioning1Components from '@/components/AdPositioning/AdPositioning1';
import NewsLayout from '@/components/News Pages/NewsLayout';
import NextLink from 'next/link'
import NewsDataCardComponents from '@/components/News Pages/NewsDataCard';
import { BLOG_URL } from 'apis/url';

const Index = ({ articles }) => {
    // console.log('articles', articles);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])
    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div style={{backgroundColor:"#f6f6f6"}}>
                        <NewsLayout >
                            <NewsDataCardComponents articles={articles}></NewsDataCardComponents>
                        </NewsLayout>
                    </div>
                </>
            )}
        </>
    )
}

export default Index;


export const getStaticProps = (async () => {
    const res = await fetch(`${BLOG_URL}`)
    const data = await res.json();
    // console.log('data', data);
    return {
        props: { articles: data?.data }, revalidate: 10,  // automatically re build this page after 10 seconds
    }
})