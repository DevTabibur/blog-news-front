import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import { Container } from "@mui/material"
import RoleBasedGuard from "Guards/RoleBasedGuard"
import useSettings from "hooks/useSettings"
import { PATH_DASHBOARD } from "routes/paths"
import FeedbackFormPage from "@/components/_dashboard/feedback/feedbackForm"


const CreateFeedbackPage = () => {
    const { themeStretch } = useSettings();

    return (
        <>
            <DashboardLayout>
                <Page title="Feedback: Create Feedback | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create Feedback"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Feedback', href: PATH_DASHBOARD.feedback.new },
                                    { name: 'Create feedback' }
                                ]}
                            />
                            <FeedbackFormPage />
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default CreateFeedbackPage