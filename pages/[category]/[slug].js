import NewsLayout from "@/components/News Pages/NewsLayout";
import { fDate } from '@/utils/formatTime';
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Link, Tooltip, Typography } from "@mui/material";
import { fetchArticleBySlug, getAllArticles } from "apis/blog.api";
import { getAllCategory } from "apis/category.api";
import Error from "next/error";
import { useRouter } from "next/router";
import NextLink from 'next/link'

// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const BlogDetailsPage = ({ article }) => {
  const router = useRouter();
  const { category, slug } = router.query;
  console.log('article', article?.data);

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

  function createMarkup(content) {
    return { __html: content };
  }
  return (
    <>

      <NewsLayout>
        <Card sx={{ maxWidth: 550, padding: '10px', marginBottom: '20px' }}>

          <CardMedia
            component="img"
            height="300"
            image={`http://localhost:8000/${article?.data?.cover}`}
            alt={`${article?.data?.metaTitle}`}
          />
          <CardContent>
            <Typography variant="h6" color="text.black">
              {article?.data?.metaTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              {fDate(article?.data?.createdAt)}
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
            <div variant="body2" sx={{ color: '#757575', fontSize: '15px', textAlign: 'left' }} dangerouslySetInnerHTML={createMarkup(article?.data?.content)}></div>
          </CardContent>

        </Card>
      </NewsLayout>
    </>
  )
}

export default BlogDetailsPage




export const getStaticPaths = async () => {
  // Fetch all categories and slugs from your API
  const Articles = await getAllArticles();
  // Articles?.data.map((at) => console.log('at', at))

  // Generate paths for all articles in all categories
  const paths = Articles?.data.map((at) => ({
    params: { category: at?.category, slug: at?.slug },
  })
  );

  return {
    paths,
    fallback: false,
  };
};



export const getStaticProps = async ({ params }) => {
  try {
    const { category, slug } = params;
    const article = await fetchArticleBySlug(category, slug);

    if (!article) {
      return {
        notFound: true, // Return a 404 error if the article is not found
      };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message, // Pass the error message as a prop
      },
    };
  }
};
