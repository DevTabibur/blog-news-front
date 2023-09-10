import LoadingScreen from "@/components/LoadingScreen";
import { ContextData } from "contexts/dataProviderContext";
import { useRouter } from "next/router";
import Login from "pages/auth/login";
import { useContext, useEffect, useState } from "react";


const AuthGuard = ({ children }) => {
    const router = useRouter();
    const { pathname } = router.query;
    const { currentlyLoggedIn } = useContext(ContextData)
    const [requestedLocation, setRequestedLocation] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!currentlyLoggedIn?.email && pathname !== requestedLocation) {
            setLoading(false)
            setRequestedLocation(pathname);
        }
    }, [currentlyLoggedIn, pathname, requestedLocation]);

    if (!currentlyLoggedIn?.email) {
        return <Login />;
    }

    if (requestedLocation && pathname !== requestedLocation) {

        setRequestedLocation(null);

        router.push(requestedLocation);

        return null;
    }
    if (loading) {
        return <>
            <LoadingScreen />
        </>
    }
    return <>
        {children}
    </>
}

export default AuthGuard

