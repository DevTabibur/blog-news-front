import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import NextLink from 'next/link'
// material
import { Box, Grid, Button, Skeleton, Container, Stack, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
// components
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// hooks
import useSettings from 'hooks/useSettings';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
import ServiceCardComponent from '@/components/_dashboard/service/ServiceCard';
import RoleBasedGuard from 'Guards/RoleBasedGuard';
import { useEffect, useState } from 'react';
import { getAllServices } from 'apis/service.api';
import { SERVICE_URL } from 'apis/url';
import { toast } from 'react-hot-toast';


const SkeletonLoad = (
    <>
        {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
            </Grid>
        ))}
    </>
);


const ServicesListPage = () => {
    const [services, setServices] = useState([])
    const { themeStretch } = useSettings();
    const NewBtn = (

        <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
            New Service
        </Button>
    );
    useEffect(() => {
        const fetchingServices = async () => {
            const res = await getAllServices()
            setServices(res?.data)
        }
        fetchingServices()
    }, [])

    function createMarkup(service) {
        return { __html: service };
    }

    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you want to delete?')
        if (confirmation) {
            const url = `${SERVICE_URL}/${id}`
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log('sevice data deleted', data);
                    if (data?.statusCode === 200) {
                        toast.success(data?.message)
                        window.location.reload()
                    }
                    else {
                        console.log('error', data);
                        toast.error(data?.message)
                    }
                })
        }


    }




    return (
        <>
            <DashboardLayout>
                <Page title="Service: Lists | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Services Lists"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Service', href: PATH_DASHBOARD.service.list },
                                    { name: `Lists ${services?.length}` }
                                ]}
                                action={
                                    <NextLink href={PATH_DASHBOARD.service.newService} passHref>
                                        {NewBtn}
                                    </NextLink>

                                }
                            />
                            {/* <Grid container spacing={3}>
                                {services.map((service) => (
                                    <Grid key={service.id} item xs={12} sm={6} md={4}>
                                        <ServiceCardComponent service={service} />
                                    </Grid>
                                ))}

                                {!services.length && SkeletonLoad}
                            </Grid> */}
                            <Grid container spacing={2}>
                                {services.map((service, i) => (
                                    <Grid key={i} item xs={6} md={4}>
                                        <Card item sx={{ maxWidth: 345 }} key={i}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image={`http://localhost:8000/${service?.serviceImage}`}
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {service?.title}
                                                </Typography>
                                                <div dangerouslySetInnerHTML={createMarkup(service?.description)} />;


                                            </CardContent>
                                            <CardActions>
                                                <Button color='error' onClick={() => handleDelete(service?._id)}>DELETE</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                                {!services.length && SkeletonLoad}
                            </Grid>





                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>
    )
}

export default ServicesListPage