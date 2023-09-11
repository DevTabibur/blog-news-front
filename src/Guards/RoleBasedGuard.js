import { Container, Alert, AlertTitle } from '@mui/material';
import { ContextData } from 'contexts/dataProviderContext';
import { useContext } from 'react';


const useCurrentRole = () => {
    const { currentlyLoggedIn } = useContext(ContextData)
    // Logic here to get current user role
    const role = currentlyLoggedIn?.role;
    return role;
};

const RoleBasedGuard = ({ accessibleRoles, children }) => {

    // console.log('accessibleRoles', accessibleRoles);
    const currentRole = useCurrentRole();

    if (!accessibleRoles.includes(currentRole)) {
        // console.log("object", accessibleRoles.includes(currentRole));
        return (
            <Container>
                <Alert severity="error">
                    <AlertTitle>Permission Denied</AlertTitle>
                    You do not have permission to access this page
                </Alert>
            </Container>
        );
    }

    return <>{children}</>;
}


export default RoleBasedGuard