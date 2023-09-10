import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import NextLink from 'next/link'
// material
import { Box, Grid, Button, Skeleton, Container, Stack } from '@mui/material';
// components
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// hooks
import useSettings from 'hooks/useSettings';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
import RoleBasedGuard from 'Guards/RoleBasedGuard';

const JobListPage = () => {
    const { themeStretch } = useSettings();
    const NewJobBtn = (

        <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
            New Job
        </Button>
    );
    return (
        <>
            <DashboardLayout>
                <Page title="Job: Lists | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Job Lists"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Job', href: PATH_DASHBOARD.job.list },
                                    { name: 'List' }
                                ]}
                                action={
                                    <NextLink href={PATH_DASHBOARD.job.newJob} passHref>
                                        {NewJobBtn}
                                    </NextLink>

                                }
                            />
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default JobListPage