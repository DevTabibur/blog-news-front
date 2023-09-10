import React, { useEffect, useState } from 'react';
import DigitalAgency from './digital-agency';
import Navbar from '@/components/_App/Navbar';
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
                <DigitalAgency />
            )}
        </>
    )
}

export default Index;