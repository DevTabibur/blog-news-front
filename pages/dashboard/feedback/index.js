import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import Page from "@/components/Page"
import RoleBasedGuard from "Guards/RoleBasedGuard"


const FeedbackPage = () => {
    return (
        <>
            <DashboardLayout>
                <Page title="Feedback: Page | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <h1>Feedback page</h1>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default FeedbackPage