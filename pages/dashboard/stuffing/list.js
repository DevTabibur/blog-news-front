import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { Button, Card, Container, Table, TableContainer } from "@mui/material";
import { PATH_DASHBOARD } from "routes/paths";
import useSettings from "src/hooks/useSettings";
import NextLink from 'next/link'
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill'
import UserListForm from "@/components/_dashboard/stuffing/UserListForm";


// ----------------------------------------------------------------------


const StuffingListPage = () => {
    const { themeStretch } = useSettings();
    // button
    const NewButton = (

        <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
            Create Stuffs
        </Button>
    );
    return (
        <>
            <DashboardLayout>
                <Page title="User: List | Minimal-UI">
                    <Container maxWidth={themeStretch ? false : 'lg'}>
                        <HeaderBreadcrumbs
                            heading="User List"
                            links={[
                                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                { name: 'Stuffs', href: PATH_DASHBOARD.stuffing.list },
                                { name: 'Stuffing Lists' }
                            ]}
                            action={
                                <NextLink href={PATH_DASHBOARD.stuffing.createStuff} passHref>
                                    {NewButton}
                                </NextLink>
                            }
                        />

                        <UserListForm/>
                    </Container>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default StuffingListPage