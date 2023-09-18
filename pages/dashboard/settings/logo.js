import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import { Container } from "@mui/material"
import { PATH_DASHBOARD } from "routes/paths"
import RoleBasedGuard from "src/Guards/RoleBasedGuard"
import useSettings from "src/hooks/useSettings"

const LogoPage = () => {
    const { themeStretch } = useSettings();
    return (
        <>
            <DashboardLayout>
                <Page title="Logo: Dynamic Logo | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create a new Logo"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Create Logo', href: PATH_DASHBOARD.settings.logo },
                                    { name: 'Upload a Logo', href: PATH_DASHBOARD.settings.logo },
                                ]}
                            />
                            <h1>Logo Page</h1>
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default LogoPage