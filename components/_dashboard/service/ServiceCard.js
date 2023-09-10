// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Tooltip, Divider, Typography, IconButton } from '@mui/material';
// components
import SvgIconStyle from '@/components/SvgIconStyle';


// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    paddingTop: 'calc(100% * 9 / 16)',
    '&:before': {
        top: 0,
        zIndex: 9,
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
        borderTopLeftRadius: theme.shape.borderRadiusMd,
        borderTopRightRadius: theme.shape.borderRadiusMd,
        backgroundColor: alpha(theme.palette.primary.darker, 0.72)
    }
}));

const CoverImgStyle = styled('img')({
    top: 0,
    zIndex: 8,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  });

  // ----------------------------------------------------------------------



const ServiceCardComponent = ({ service, ...other }) => {
    const { title , cover} = service;
    return (
        <>
            <Card {...other}>
                <CardMediaStyle>
                    
                    <CoverImgStyle alt="cover" src={cover} />
                </CardMediaStyle>

                <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
                    {title}
                </Typography>
                <Divider />

                {/* <Grid container sx={{ py: 3, textAlign: 'center' }}>
                    {InfoItem(follower)}
                    {InfoItem(following)}
                    {InfoItem(totalPost)}
                </Grid> */}
            </Card>
        </>
    )
}

export default ServiceCardComponent