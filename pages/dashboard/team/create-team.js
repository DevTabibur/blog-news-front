import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
import TeamFormPage from '@/components/_dashboard/team/TeamForm'
import { Container } from '@mui/material'
import RoleBasedGuard from 'Guards/RoleBasedGuard'
import useSettings from 'hooks/useSettings'
import { PATH_DASHBOARD } from 'routes/paths'


const CreateTeamMemberPage = () => {
    const { themeStretch } = useSettings();
    return (
        <>
            <DashboardLayout>
                <Page title="Team: Create Team | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create Team Member"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Team', href: PATH_DASHBOARD.team.newTeamMembers },
                                    { name: 'Create team member' }
                                ]}
                            />
                            <TeamFormPage />
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default CreateTeamMemberPage