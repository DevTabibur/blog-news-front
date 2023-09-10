import AppWelcome from '@/components/dashboard/AppWelcome';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';


const DashboardPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     setIsLoading(true)
    //     const timer = setTimeout(() => {
    //         setIsLoading(false)

    //     }, 3000)

    //     return () => clearTimeout(timer)
    // }, [])

    // if (isLoading) {
    //     return <>
    //         <CircularProgress />
    //     </>
    // }

    return (
        <>
                <DashboardLayout>
                    <AppWelcome />
                </DashboardLayout>
        </>
    )
}

export default DashboardPage