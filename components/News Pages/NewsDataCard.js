import { orderBy } from 'lodash';
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Grid, Link, Skeleton, Tooltip } from '@mui/material';
import NextLink from 'next/link';
// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getAllArticles } from 'apis/blog.api';
import { fDate } from '@/utils/formatTime';


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



const NewsDataCardComponents = ({articles}) => {
    console.log('articles', articles);
    // const [articles, setArticles] = useState([]);
    // const [filters, setFilters] = useState('latest');
    // const [hasMore, setHasMore] = useState(true); // Initialize hasMore state
    // const [index, setIndex] = useState(0); // Initialize index state
    // const step = 5; // Define your step value for pagination

    // // Fetch more articles when scrolling
    // const onScroll = async () => {
    //     try {
    //         // console.log('Scrolling down...');
    //         // Fetch more articles here, you'll need to adjust your API call accordingly
    //         const moreArticles = await getAllArticles(index, step); // Example API call
    //         if (moreArticles && moreArticles.length > 0) {
    //             setArticles([...articles, ...moreArticles]);
    //             setIndex(index + step);
    //         } else {
    //             setHasMore(false); // No more articles to fetch
    //         }
    //     } catch (error) {
    //         console.error('Error fetching more articles', error);
    //     }
    // };


    // useEffect(() => {
    //     const getArticles = async () => {
    //         try {
    //             const res = await getAllArticles(0, step); // Fetch initial articles
    //             setArticles(res?.data || []);
    //             setIndex(step); // Set the initial index value
    //         } catch (error) {
    //             console.error('Error fetching articles', error);
    //         }
    //     };
    //     getArticles();
    // }, [step]);

    // const sortedArticles = applySort(articles, filters);

    // const handleChangeSort = (event) => {
    //     setFilters(event.target.value);
    // };

    // for sharing blog news
    const shareOnFacebook = ({ articleId }) => {
        console.log('articleId', articleId);
        // window.open(`https://www.facebook.com/sharer/sharer.php?u=${articleId}`, 'Facebook Share', 'width=600,height=400');
    };

    const shareOnTwitter = ({ articleId }) => {
        window.open(`https://twitter.com/intent/tweet?url=${articleId}`, 'Twitter Share', 'width=600,height=400');
    };

    const shareOnLinkedIn = ({ articleId }) => {
        window.open(`https://www.linkedin.com/shareArticle?url=${articleId}`, 'LinkedIn Share', 'width=600,height=400');
    };


    // console.log('articles', articles);
    function createMarkup(content) {
        return { __html: content };
    }

    return (
        <>
            <Card sx={{ maxWidth: 550, padding: '10px', marginBottom: '20px' }}>
                <Typography variant='h4' sx={{ mb: '10px' }}>
                    Bengali News
                </Typography>
                {articles.map((art, i) => (
                    // Add a unique key to the Card component
                    <Card sx={{ marginBottom: '20px' }} key={i}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={`http://localhost:8000/${art?.cover}`}
                            alt={`${art?.metaTitle}`}
                        />
                        <CardContent>
                            <Typography variant="h6" color="text.black">
                                {art?.metaTitle}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                                {fDate(art?.createdAt)}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Tooltip title="Share on Facebook">
                                    <IconButton onClick={() => shareOnFacebook('123')}>
                                        <FacebookIcon fontSize="small" sx={{ color: '#1877F2' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Share on Twitter">
                                    <IconButton onClick={shareOnTwitter}>
                                        <TwitterIcon fontSize="small" sx={{ color: '#1DA1F2' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Share on LinkedIn">
                                    <IconButton onClick={shareOnLinkedIn}>
                                        <LinkedInIcon fontSize="small" sx={{ color: '#0A66C2' }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <div variant="body2" sx={{ color: '#757575', fontSize: '15px', textAlign: 'left' }} dangerouslySetInnerHTML={createMarkup(art?.content)}></div>
                        </CardContent>
                        <CardActions disableSpacing sx={{ color: '#b7410e', fontFamily: 'bold', fontSize: '15px' }}>
                            <NextLink href={`/${art?.category}/${art?.slug}`} passHref>
                                <Link style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ color: '#b7410e' }} variant="body1" component="span">
                                        বিস্তারিত পড়ুন
                                    </Typography>
                                    <ExpandMoreIcon sx={{ color: '#b7410e' }} />
                                </Link>
                            </NextLink>
                        </CardActions>
                    </Card>
                ))}
            </Card>


        </>
    )
}

export default NewsDataCardComponents