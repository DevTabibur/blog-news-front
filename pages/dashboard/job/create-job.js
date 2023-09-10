import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import Page from '@/components/Page'
import RoleBasedGuard from 'Guards/RoleBasedGuard'
import React from 'react'

const CreateJobPage = () => {
    return (
        <>
            <DashboardLayout>
                <Page title="Job: Create Job | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <h1>Create job post</h1>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default CreateJobPage