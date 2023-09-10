import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import Page from "@/components/Page"
import RoleBasedGuard from "Guards/RoleBasedGuard"

const ServicesPage = () => {
    return (
        <>
            <DashboardLayout>
                <Page title="Service: Page | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <p>services</p>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default ServicesPage