import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import RoleBasedGuard from "Guards/RoleBasedGuard"

const FAQPage = () => {
    return (
        <>
            <DashboardLayout>
                <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                    <h1>This is FAQ Page</h1>
                </RoleBasedGuard>
            </DashboardLayout>
        </>
    )
}

export default FAQPage