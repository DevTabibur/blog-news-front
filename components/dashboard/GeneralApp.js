// material
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import AppWelcome from './AppWelcome';
import Page from '../Page';
// import {
//     AppWelcome,
//     AppWidgets1,
//     AppWidgets2,
//     AppFeatured,
//     AppNewInvoice,
//     AppTopAuthors,
//     AppTopRelated,
//     AppAreaInstalled,
//     AppTotalDownloads,
//     AppTotalInstalled,
//     AppCurrentDownload,
//     AppTotalActiveUsers,
//     AppTopInstalledCountries
// } from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
    const { themeStretch } = useSettings();
    const user = {
        displayName: 'Tabibur Rahman'
    }

    return (
        <>
            <Page title="General: App | BoostingOn Agency">
                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={3}>
                    </Grid>
                </Container>
            </Page>
        </>
    );
}
