import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import { Container } from "@mui/material"
import { PATH_DASHBOARD } from "routes/paths"
import RoleBasedGuard from "src/Guards/RoleBasedGuard"
import useSettings from "src/hooks/useSettings"


const WebsiteNamePage = () => {
    const { themeStretch } = useSettings();
    return (
        <>
            <DashboardLayout>
                <Page title="Name: Dynamic Website Name | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create a new website name"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Create Website Name', href: PATH_DASHBOARD.settings.websiteName },
                                    { name: ' Name', href: PATH_DASHBOARD.settings.websiteName },
                                ]}
                            />
                            <h1>WebsiteNamePage</h1>
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default WebsiteNamePage