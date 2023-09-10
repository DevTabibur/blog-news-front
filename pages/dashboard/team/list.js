import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import NextLink from 'next/link'
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import Page from '@/components/Page'
import { Avatar, Button, ButtonGroup, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import RoleBasedGuard from 'Guards/RoleBasedGuard'
import useSettings from 'hooks/useSettings'
import React, { useEffect, useState } from 'react'
import { PATH_DASHBOARD } from 'routes/paths';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { getAllTeamMembers } from 'apis/team.api';
import { TEAM_URL } from 'apis/url';
import { toast } from 'react-hot-toast';

const TeamMemberLists = () => {
    const { themeStretch } = useSettings();
    const [teams, setTeams] = useState([])
    const NewBtn = (

        <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
            New Team Member
        </Button>
    );

    useEffect(() => {
        const fetchingTeam = async () => {
            const res = await getAllTeamMembers()
            setTeams(res?.data)
        }
        fetchingTeam()

    }, [])

    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you want to delete?')
        if (confirmation) {
            const url = `${TEAM_URL}/${id}`;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log('deleted data', data);
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
    return (
        <>
            <DashboardLayout>
                <Page title="Team: Lists | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Team Member Lists"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Team', href: PATH_DASHBOARD.team.list },
                                    { name: `Lists ${teams?.length}` }
                                ]}
                                action={
                                    <NextLink href={PATH_DASHBOARD.team.newTeamMembers} passHref>
                                        {NewBtn}
                                    </NextLink>

                                }
                            />

                            <Grid container spacing={2}>
                                {teams.map((tm, i) => (
                                    <Grid key={i} item xs={6} md={4}>
                                        <Card>
                                            <CardMedia
                                                sx={{ height: 160 }}
                                                // src={`http://localhost:8000/${tm?.memberImage}`}
                                                image={`http://localhost:8000/${tm?.memberImage}`}
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={`http://localhost:8000/${tm?.memberImage}`}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                                <Typography variant="h6">{tm?.name?.firstName} {tm?.middleName} {tm?.name?.lastName}</Typography>
                                                <Typography variant="p">{tm?.position}</Typography>

                                                <Typography variant="body1">“{tm?.description}”</Typography>

                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <ButtonGroup variant="text" aria-label="text button group">
                                                        <Button color="error" onClick={() => handleDelete(tm?._id)}>Delete</Button>
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

export default TeamMemberLists