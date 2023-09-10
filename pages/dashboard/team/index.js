import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import Page from '@/components/Page'
import RoleBasedGuard from 'Guards/RoleBasedGuard'


const TeamMemberPage = () => {
  return (
    <>
      <DashboardLayout>
        <Page title="Team: Page | BoostingOn Agency">
          <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
            <h1>Team root page</h1>
          </RoleBasedGuard>
        </Page>
      </DashboardLayout>
    </>
  )
}

export default TeamMemberPage