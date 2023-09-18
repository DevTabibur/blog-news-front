import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import { Container } from "@mui/material"
import { PATH_DASHBOARD } from "routes/paths"
import RoleBasedGuard from "src/Guards/RoleBasedGuard"
import useSettings from "src/hooks/useSettings"


const FavIconPage = () => {
    const { themeStretch } = useSettings();
  return (
    <>
        <DashboardLayout>
                <Page title="Icon: Fav Icon | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Upload a new FavIcon"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Create FavIcon', href: PATH_DASHBOARD.settings.favicon },
                                    { name: 'Upload a FavIcon', href: PATH_DASHBOARD.settings.favicon },
                                ]}
                            />
                            <h1>FavIcon Page</h1>
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
    </>
  )
}

export default FavIconPage