import { orderBy } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import NextLink from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import { Box, Grid, Button, Skeleton, Container, Stack } from '@mui/material';
// hooks
// routes
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from 'components/_dashboard/blog';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'routes/paths';
import RoleBasedGuard from 'src/Guards/RoleBasedGuard';
import { getAllArticles } from 'apis/blog.api';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
    if (sortBy === 'latest') {
        return orderBy(posts, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
        return orderBy(posts, ['createdAt'], ['asc']);
    }
    if (sortBy === 'popular') {
        return orderBy(posts, ['view'], ['desc']);
    }
    return posts;
};

const SkeletonLoad = (
    <Grid container spacing={3} sx={{ mt: 2 }}>
        {[...Array(4)].map((_, index) => (
            <Grid item xs={12} md={3} key={index}>
                <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
                <Box sx={{ display: 'flex', mt: 1.5 }}>
                    <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
                    <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
                </Box>
            </Grid>
        ))}
    </Grid>
);

export default function BlogList() {
    const { themeStretch } = useSettings();
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState('latest');
    const [hasMore, setHasMore] = useState(true); // Initialize hasMore state
    const [index, setIndex] = useState(0); // Initialize index state
    const step = 5; // Define your step value for pagination

    // Fetch more articles when scrolling
    const onScroll = async () => {
        try {
            // console.log('Scrolling down...');
            // Fetch more articles here, you'll need to adjust your API call accordingly
            const moreArticles = await getAllArticles(index, step); // Example API call
            if (moreArticles && moreArticles.length > 0) {
                setArticles([...articles, ...moreArticles]);
                setIndex(index + step);
            } else {
                setHasMore(false); // No more articles to fetch
            }
        } catch (error) {
            console.error('Error fetching more articles', error);
        }
    };


    useEffect(() => {
        const getArticles = async () => {
            try {
                const res = await getAllArticles(0, step); // Fetch initial articles
                setArticles(res?.data || []);
                setIndex(step); // Set the initial index value
            } catch (error) {
                console.error('Error fetching articles', error);
            }
        };
        getArticles();
    }, [step]);

    const sortedArticles = applySort(articles, filters);

    const handleChangeSort = (event) => {
        setFilters(event.target.value);
    };


    // button
    const NewPostBtn = (

        <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
            New Post
        </Button>
    );

    return (
        <>
            <DashboardLayout>
                <Page title="Blog: Posts | Minimal-UI">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Blog"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Blog', href: PATH_DASHBOARD.blog.root },
                                    { name: 'List' }
                                ]}
                                action={
                                    <NextLink href={PATH_DASHBOARD.blog.newPost} passHref>
                                        {NewPostBtn}
                                    </NextLink>
                                }
                            />

                            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                                <BlogPostsSearch />
                                <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
                            </Stack>

                            <InfiniteScroll
                                dataLength={articles.length}
                                next={onScroll}
                                hasMore={hasMore}
                                loader={SkeletonLoad}
                                style={{ overflow: 'inherit' }}
                            >
                                <Grid container spacing={3}>
                                    {sortedArticles.map((article, index) => (
                                        <BlogPostCard key={index} article={article} index={index} />
                                    ))}
                                </Grid>
                            </InfiniteScroll>
                        </Container>
                    </RoleBasedGuard>
                </Page>
            </DashboardLayout>
        </>


    );
}
