import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import { Button, Container } from "@mui/material"
import RoleBasedGuard from "../../src/Guards/RoleBasedGuard"
import { PATH_DASHBOARD } from "routes/paths"
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import useSettings from "hooks/useSettings"
import NextLink from 'next/link'
import CustomizedAccordionData from "@/components/_dashboard/faq/AccordionData"
import { useEffect, useState } from "react"
import { deleteSingleFAQ, getAllFAQ } from "apis/faq.api"
import { toast } from "react-hot-toast"


const FAQListPage = () => {
    const { themeStretch } = useSettings();

    const [faqs, setFaqs] = useState([])

    useEffect(() => {
        const getFAQFunction = async () => {
            const faqs = await getAllFAQ()
            setFaqs(faqs?.data)
        }
        getFAQFunction()
    }, [])



    // delete faq
    const handleDeleteFAQ = async (id) => {
        const confirmation = window.confirm('Are you want to delete?')
        if (confirmation) {
            const res = await deleteSingleFAQ(id)
            if (res?.statusCode === 200) {
                toast.success(res?.message)
                window.location.reload()
            }
        }

    }




    // button
    const NewFaqBtn = (

        <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
            Create FAQ
        </Button>
    );
    return (
        <>
            <DashboardLayout>
                <Page title="FAQ: Lists | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="FAQ Lists"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'FAQ', href: PATH_DASHBOARD.faq.list },
                                    { name: `total faq lists ${faqs.length}` }
                                ]}
                                action={
                                    <NextLink href={PATH_DASHBOARD.faq.newFAQ} passHref>
                                        {NewFaqBtn}
                                    </NextLink>

                                }
                            />
                            {faqs?.map((fq) =>
                                <CustomizedAccordionData fq={fq} handleDeleteFAQ={handleDeleteFAQ} />
                            )}







                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default FAQListPage