import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import ProjectFormPage from "@/components/_dashboard/project/ProjectForm"
import { Container } from "@mui/material"
import RoleBasedGuard from "Guards/RoleBasedGuard"
import useSettings from "hooks/useSettings"
import { PATH_DASHBOARD } from "routes/paths"


const CreateProjectsPage = () => {
    const { themeStretch } = useSettings();
    return (
        <>
            <DashboardLayout>
                <Page title="Project: Create Project | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Create Project"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Project', href: PATH_DASHBOARD.project.new },
                                    { name: 'Create project' }
                                ]}
                            />
                           <ProjectFormPage/>
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default CreateProjectsPage