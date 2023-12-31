import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useRouter } from 'next/router';
// material
import { Box, Card, Divider, Skeleton, Container, Typography, Pagination } from '@mui/material';
// redux
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
// components
import Page from 'components/Page';
import Markdown from '@/components/Markdown';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import {
    BlogPostHero,
    BlogPostTags,
    BlogPostRecent,
    BlogPostCommentList,
    BlogPostCommentForm
} from 'components/_dashboard/blog';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import useSettings from 'src/hooks/useSettings';
import RoleBasedGuard from 'src/Guards/RoleBasedGuard';


// ----------------------------------------------------------------------

const SkeletonLoad = (
    <>
        <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="circular" width={64} height={64} />
            <Box sx={{ flexGrow: 1, ml: 2 }}>
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
            </Box>
        </Box>
    </>
);

export default function BlogPost() {
    const { themeStretch } = useSettings();
    // const { title } = useRouter();
    // const { post, error, recentPosts } = useSelector((state) => state.blog);
    const post = 'hi hello';
    const recentPosts = 'recent posts';
    const title = 'abc dummy title'

    return (
        <>
            <DashboardLayout>
                <Page title="Blog: Post Details | BoostingOn Agency">
                    <RoleBasedGuard accessibleRoles={['super admin', 'admin']}>
                        <Container maxWidth={themeStretch ? false : 'lg'}>
                            <HeaderBreadcrumbs
                                heading="Post Details"
                                links={[
                                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                                    { name: 'Blog', href: PATH_DASHBOARD.blog.root },
                                    { name: sentenceCase(title) }
                                ]}
                            />
                            <h1>This is a blog posts page</h1>

                            {/* {post && (
                    <Card>
                        <BlogPostHero post={post} />

                        <Box sx={{ p: { xs: 3, md: 5 } }}>
                            <Typography variant="h6" sx={{ mb: 5 }}>
                                {post.description}
                            </Typography>

                            <Markdown children={post.body} />

                            <Box sx={{ my: 5 }}>
                                <Divider />
                                <BlogPostTags post={post} />
                                <Divider />
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography variant="h4">Comments</Typography>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                    ({post.comments.length})
                                </Typography>
                            </Box>

                            <BlogPostCommentList post={post} />

                            <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Pagination count={8} color="primary" />
                            </Box>

                            <BlogPostCommentForm />
                        </Box>
                    </Card>
                )}

                {!post && SkeletonLoad}

                {error && <Typography variant="h6">404 Post not found</Typography>}

                {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />} */}
                        </Container>
                    </RoleBasedGuard>
                </Page>

            </DashboardLayout>
        </>

    );
}
