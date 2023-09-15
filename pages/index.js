import React, { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import BlogNavComponents from '@/components/News Pages/BlogNav';
import AdPositioning1Components from '@/components/AdPositioning/AdPositioning1';
import NewsLayout from '@/components/News Pages/NewsLayout';
import NextLink from 'next/link'
import NewsDataCardComponents from '@/components/News Pages/NewsDataCard';

const Index = () => {
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
                    <div style={{ backgroundColor: '#f5f5f5', height:'100vh' }}>
                        <NewsLayout >
                            <NewsDataCardComponents></NewsDataCardComponents>
                        </NewsLayout>
                    </div>
                </>
            )}
        </>
    )
}

export default Index;