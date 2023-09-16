import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
import CreateCategory from '@/components/_dashboard/category/CreateCategory'
import { Container } from '@mui/material'
import React from 'react'
import { PATH_DASHBOARD } from 'routes/paths'
import RoleBasedGuard from 'src/Guards/RoleBasedGuard'
import useSettings from 'src/hooks/useSettings'

const NewCategory = () => {
  const { themeStretch } = useSettings();
  return (
    <>
      <DashboardLayout>
        <Page title="Category: Create Category | BoostingOn Agency">
          <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading="Create a new category"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Category', href: PATH_DASHBOARD.category.newCategory },
                  { name: 'New Category' }
                ]}
              />
              <CreateCategory />
            </Container>
          </RoleBasedGuard>

        </Page>
      </DashboardLayout>
    </>
  )
}

export default NewCategory