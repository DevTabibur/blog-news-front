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



const NewsDataCardComponents = () => {
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





    return (
        <>
            <Card sx={{ maxWidth: 550, padding: '10px', marginBottom: '10px' }}>
                <Typography variant='h4' sx={{ mb: '10px' }}>
                    Bengali News
                </Typography>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://images.hindustantimes.com/bangla/img/2023/09/12/600x338/f2a_1694511882321_1694511882482.jpeg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="h6" color="text.black">
                        দিনে ২ ঘণ্টার বেশি জেরা নয়, সৌমেন্দুর রক্ষাকবচের মেয়াদ বাড়াল হাইকোর্ট
                    </Typography>
                    <Typography variant='p' color="text.secondary">
                        September 14, 2016
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
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '15px', textAlign: 'left' }}>
                        কিন্তু কবে এবং কীভাবে তার ফলপ্রকাশ হবে সেটা অজানা ছিল। আর পরীক্ষার্থীর সংখ্যা ছিল ৫ লক্ষের বেশি। ক্লার্ক, লাইব্রেরিয়ান, সুইপার–সহ একাধিক শূন্যপদে নিয়োগ হওয়ার কথা থাকলেও তা হয়নি। এই নিয়োগ না হওয়া নিয়ে বিক্ষোভ দেখিয়েছিলেন মাদ্রাসা সার্ভিস কমিশনের চাকরিপ্রার্থীরা। আর কোনও রাস্তা দেখা যাচ্ছিল না।
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ color: '#b7410e', fontFamily: 'bold', fontSize: '15px' }}>
                    <NextLink href={`/category`} passHref>
                        <Link style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ color: '#b7410e' }} variant="body1" component="span">
                                বিস্তারিত পড়ুন
                            </Typography>
                            <ExpandMoreIcon sx={{ color: '#b7410e' }} />
                        </Link>
                    </NextLink>
                </CardActions>

            </Card >

        </>
    )
}

export default NewsDataCardComponents