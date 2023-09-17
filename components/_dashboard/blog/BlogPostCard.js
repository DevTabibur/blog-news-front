import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import eyeFill from '@iconify/icons-eva/eye-fill';
import NextLink from 'next/link'
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Typography, CardContent, Link, CardActions, IconButton, Modal } from '@mui/material';
// routes
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SvgIconStyle from '../../SvgIconStyle';
import { PATH_DASHBOARD } from 'routes/paths';
import { fDate } from '@/utils/formatTime';
import { useState } from 'react';
import { deleteArticle } from 'apis/blog.api';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function BlogPostCard({ article, index }) {
  const { cover, metaTitle, content, tags, category, createdAt, view, share, _id } = article
  console.log('article', article);
  // for modal
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    console.log('Modal data', data);
    // setEditedData(data);
    // // Store the _id of the category
    // setCategoryIdToEdit(data._id);
    // // Set the form values based on the clicked data
    // formik.setValues({
    //   categoryName: data.categoryName,
    //   categoryLink: data.categoryLink,
    // });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // delete a article
  const deleteButton = async (id) => {
    const confirmation = window.confirm("Do you want to DELETE?")
    if (confirmation) {
        const res = await deleteArticle(id);
        if (res?.statusCode === 200) {
            toast.success(res?.message)
            window.location.reload()
        }
        else {
            toast.error(res?.message)
        }
    }
  }

  const linkTo = `${PATH_DASHBOARD.blog.root}/${paramCase(metaTitle)}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: view, icon: eyeFill },
    { number: share, icon: shareFill }
  ];

  return (
    <>



      <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
        <Card sx={{ position: 'relative' }}>
          <CardContent
            sx={{
              pt: 4,
            }}
          >
            <Typography variant="h3">{metaTitle}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              {fDate(createdAt)}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
              {POST_INFO.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: index === 0 ? 0 : 1.5,
                    ...((latestPostLarge || latestPost) && {
                      color: 'grey.500'
                    })
                  }}
                >
                  <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                  <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                </Box>
              ))}

              {/* IconButton container */}
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleOpen(article)} aria-label="edit" sx={{ color: 'green' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteButton(_id)} aria-label="delete" sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* // modal */}
      {open && (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              CATEGORY: CATEGORY
            </Typography>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              CATEGORY LINK: LINK
            </Typography>

            
          </Box>
        </Modal>
      )}

    </>
  );
}
