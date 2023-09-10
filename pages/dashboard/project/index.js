import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import Page from '@/components/Page'
import RoleBasedGuard from 'Guards/RoleBasedGuard'

const ProjectsPage = () => {
    return (
        <>
            <DashboardLayout>
                <Page title="Project: Page | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>

                        <h1>ProjectsPage</h1>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default ProjectsPage