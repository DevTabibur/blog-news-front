import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
import CategoryLists from '@/components/_dashboard/category/CategoryLists'
import { Container } from '@mui/material'
import { getAllCategory } from 'apis/category.api'
import React, { useEffect, useState } from 'react'
import { PATH_DASHBOARD } from 'routes/paths'
import RoleBasedGuard from 'src/Guards/RoleBasedGuard'
import useSettings from 'src/hooks/useSettings'

const CategoryListPage = () => {
  const { themeStretch } = useSettings();
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategory = async () => {
      const res = await getAllCategory()
      setCategories(res?.data)
      return (res?.data)
    }
    getCategory()
  }, [])

  // console.log('categories', categories);

  return (
    <>
      <DashboardLayout>
        <Page title="Category: Category Lists | BoostingOn Agency">
          <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading="Create a new post"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Category', href: PATH_DASHBOARD.category.list },
                  { name: `Category lists ${categories?.length}` }
                ]}
              />
              <CategoryLists />
            </Container>
          </RoleBasedGuard>
        </Page>
      </DashboardLayout>
    </>
  )
}

export default CategoryListPage