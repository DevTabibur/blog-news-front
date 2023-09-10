import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import FaqFormPage from "@/components/_dashboard/faq/faqForm"
import { Container } from "@mui/material"
import RoleBasedGuard from "Guards/RoleBasedGuard"
import useSettings from "hooks/useSettings"
import { useRouter } from "next/router"
import { PATH_DASHBOARD } from "routes/paths"


const CreateFAQPage = () => {
    const { themeStretch } = useSettings();
    return (
        <>
            <DashboardLayout>
                <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create Faq"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'FAQ', href: PATH_DASHBOARD.faq.newFAQ },
                                    { name: 'Create faq' }
                                ]}
                            />
                            <FaqFormPage/>
                        </Container>
                </RoleBasedGuard>
            </DashboardLayout>
        </>
    )
}

export default CreateFAQPage