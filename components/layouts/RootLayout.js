import { Container, Grid, useMediaQuery } from '@mui/material';
import BlogNavComponents from '../News Pages/BlogNav';
import NewsLeftCategoryStyleComponents from '../News Pages/NewsLeftCategoryStyle';
import Page from '../Page';
const RootLayout = ({ children }) => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isTabletScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    return (
        <>
            <Page title="Blog News">
                {/* <AdPositioning1Components /> */}
                <BlogNavComponents />
                <Container>
                    <Grid container spacing={2}>
                        {!isSmallScreen && (
                            <Grid sx={{ mt: '0px`' }} item xs={3}>
                                <NewsLeftCategoryStyleComponents />
                            </Grid>
                        )}

                        <Grid item xs={12} sm={7} >
                            {children}
                        </Grid>
                        {!isTabletScreen && (
                            <Grid item xs={2}>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Page>
        </>
    )
}

export default RootLayout