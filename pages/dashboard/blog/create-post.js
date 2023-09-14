// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
//components
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { BlogNewPostForm } from '@/components/_dashboard/blog';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import useSettings from 'src/hooks/useSettings';
import RoleBasedGuard from 'src/Guards/RoleBasedGuard';
import Page from '@/components/Page';




// ----------------------------------------------------------------------

export default function CreatePost() {
    const { themeStretch } = useSettings();

    return (
        <>
            <DashboardLayout>

                <Page title="Blog: Create Post | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create a new post"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Blog', href: PATH_DASHBOARD.blog.newPost },
                                    { name: 'Create New Post' }
                                ]}
                            />
                            <BlogNewPostForm />
                        </Container>
                    </RoleBasedGuard>
                </Page>


            </DashboardLayout>
        </>
    );
}
