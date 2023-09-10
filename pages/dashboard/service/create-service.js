
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import NextLink from 'next/link'
// material
import { Box, Grid, Button, Skeleton, Container, Stack } from '@mui/material';
// components
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
import ServiceForm from '@/components/_dashboard/service/ServiceForm';
// hooks
import useSettings from 'hooks/useSettings';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
import RoleBasedGuard from 'Guards/RoleBasedGuard';



const CreateNewServicePage = () => {
    const { themeStretch } = useSettings();


    return (
        <>
            <DashboardLayout>
                <Page title="Service: Create New Service | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create New Service"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Create Service', href: PATH_DASHBOARD.service.newService },
                                    { name: 'New Service' }
                                ]}

                            />

                            <ServiceForm />

                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default CreateNewServicePage