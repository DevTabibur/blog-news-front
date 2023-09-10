import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import Page from '@/components/Page'
import RoleBasedGuard from 'Guards/RoleBasedGuard'

const ProjectListPage = () => {
    return (
        <>
            <DashboardLayout>
                <Page title="Project: Lists | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <h1>ProjectListPage</h1>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default ProjectListPage