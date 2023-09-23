import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import CreateStuffForm from "@/components/_dashboard/stuffing/CreateStuffForm"
import { Container } from "@mui/material"
import { PATH_DASHBOARD } from "routes/paths"
import RoleBasedGuard from "src/Guards/RoleBasedGuard"
import useSettings from "src/hooks/useSettings"


const CreateStuffPage = () => {
    const { themeStretch } = useSettings();
    return (
        <>

            <DashboardLayout>
                <Page title="Stuffing: Create Stuff | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create a new Stuff"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Stuffing', href: PATH_DASHBOARD.stuffing.createStuff },
                                    { name: 'New Stuff' }
                                ]}
                            />
                            <CreateStuffForm/>
                        </Container>
                    </RoleBasedGuard>

                </Page>
            </DashboardLayout>
        </>
    )
}

export default CreateStuffPage