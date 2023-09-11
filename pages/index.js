import React, { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

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
                    <h1>Hello This is Index.js</h1>
                </>
            )}
        </>
    )
}

export default Index;