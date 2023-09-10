import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs"
import Page from "@/components/Page"
import { Avatar, Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Container, FormHelperText, Grid, Modal, Stack, Typography } from "@mui/material"
import RoleBasedGuard from "Guards/RoleBasedGuard"
import { getAllFeedback } from "apis/feedback.api"
import useSettings from "hooks/useSettings"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { PATH_DASHBOARD } from "routes/paths"
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import NextLink from 'next/link'
import { FEEDBACK_URL } from "apis/url"
import { toast } from "react-hot-toast"


const FeedbackListPage = () => {
    const { themeStretch } = useSettings();
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        const getFeedback = async () => {
            const reviews = await getAllFeedback()
            setReviews(reviews?.data)
        }
        getFeedback()
    }, [])

    const handleDeleteFeedback = async (id) => {
        const confirmation = window.confirm('Are you want to delete?')
        if (confirmation) {
            const url = `${FEEDBACK_URL}/${id}`;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log('feedback deleted data', data);
                    if (data?.statusCode === 200) {
                        toast.success(data?.message)
                        window.location.reload()
                    }
                    else if (data?.status === 'false') {
                        toast.error(data?.message)
                    }
                    else {
                        console.log('error data', data)
                    }
                })
        }



    }


    // button
    const NewFeedBackBtn = (

        <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
            Create Feedback
        </Button>
    );
    return (
        <>
            <DashboardLayout>
                <Page title="Feedback: Lists | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Feedback Lists"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Feedback', href: PATH_DASHBOARD.feedback.list },
                                    { name: `feedback lists ${reviews?.length}` }
                                ]}
                                action={
                                    <NextLink href={PATH_DASHBOARD.feedback.new} passHref>
                                        {NewFeedBackBtn}
                                    </NextLink>

                                }
                            />


                            <Grid container spacing={2}>
                                {reviews.map((rv, i) => (
                                    <Grid key={i} item xs={6} md={4}>
                                        <Card>
                                            <CardContent>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={`http://localhost:8000/${rv?.manImage}`}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                                <Typography variant="h6">{rv?.name?.firstName} {rv?.name?.lastName}</Typography>
                                                <Typography variant="p">{rv?.positionName}</Typography>

                                                <Typography variant="body1">“{rv?.feedbackDescription}”</Typography>

                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <ButtonGroup variant="text" aria-label="text button group">
                                                        <Button color="error" onClick={() => handleDeleteFeedback(rv?._id)}>Delete</Button>
                                                    </ButtonGroup>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>





                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default FeedbackListPage