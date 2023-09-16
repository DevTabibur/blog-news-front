import NewsLayout from '@/components/News Pages/NewsLayout'

import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Page from '@/components/Page';
import IconButton from '@mui/material/IconButton';
import { CardMedia } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link'

const CategoryPage = () => {
    const router = useRouter()
    const { category } = router.query;
    return (
        <>
            <Page title={`${category} | Blog News`}>
                <NewsLayout>


                    <Card sx={{ mb: '10px' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} variant='h5'>
                                {category} সংবাদ
                            </Typography>

                        </CardContent>
                    </Card>

                    <Card sx={{ display: 'flex', mb: '10px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ display: 'flex', flex: '1 0 auto' }}>
                                <Image
                                    src={`https://images.hindustantimes.com/bangla/img/2023/09/14/90x90/CRICKET-ASIA-2023-SRI-PAK-ODI-1_1694719250818_1694719267437.jpg`}
                                    width={100}
                                    height={100}
                                    alt="Picture of the author"
                                />
                                <Box sx={{  alignItems: 'center', pl: 2, pb: 1 }}>
                                    <Typography sx={{mb:'18px'}}>
                                    <NextLink href={`/${category}/sl-vs-pak`}>
                                        SL vs PAK Asia Cup 2023: শেষ বলে রুদ্ধশ্বাস জয়, পাকিস্তানকে ছিটকে দিয়ে এশিয়া কাপের ফাইনালে শ্রীলঙ্কা
                                        </NextLink>
                                    </Typography>
                                    <Typography >
                                        Updated At: ১ মিনিটে পড়ুন
                                    </Typography>
                                </Box>
                            </CardContent>

                        </Box>
                    </Card>



                </NewsLayout>
            </Page>
        </>
    )
}

export default CategoryPage