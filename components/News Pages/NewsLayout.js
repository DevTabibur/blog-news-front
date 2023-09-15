import { Container, Grid, styled, useMediaQuery } from "@mui/material";
import NewsLeftCategoryStyleComponents from "./NewsLeftCategoryStyle";
import NewsDataCardComponents from "./NewsDataCard";
import AdPositioning1Components from "../AdPositioning/AdPositioning1";
import BlogNavComponents from "./BlogNav";



const NewsLayout = ({children}) => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isTabletScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    return (
        <>

            <AdPositioning1Components />
            <BlogNavComponents />
            <Container>
                <Grid container spacing={4}>
                    {!isSmallScreen && (
                        <Grid item xs={3}>
                            <NewsLeftCategoryStyleComponents/>
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
        </>
    )
}

export default NewsLayout