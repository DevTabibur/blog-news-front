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
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'routes/paths';
import RoleBasedGuard from 'src/Guards/RoleBasedGuard';

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
    const dispatch = useDispatch();
    const [filters, setFilters] = useState('latest');
    // const { posts, hasMore, index, step } = useSelector((state) => state.blog);
    const posts = [
        { id: 1, title: 'dummy1', author: [{ name: 'habib' }, { avatarUrl: '' }] },
        // { id: 2, title: 'dummy2' }
    ]
    const hasMore = true
    const sortedPosts = applySort(posts, filters);
    const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

    // useEffect(() => {
    //     dispatch(getPostsInitial(index, step));
    // }, [dispatch, index, step]);

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
                                next={onScroll}
                                hasMore={hasMore}
                                loader={SkeletonLoad}
                                dataLength={posts.length}
                                style={{ overflow: 'inherit' }}
                            >
                                <Grid container spacing={3}>
                                    {sortedPosts.map((post, index) => (
                                        <BlogPostCard key={post.id} post={post} index={index} />
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