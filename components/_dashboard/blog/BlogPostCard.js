import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import eyeFill from '@iconify/icons-eva/eye-fill';
import NextLink from 'next/link'
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Typography, CardContent, Link, CardActions, IconButton, Modal, Stack, FormHelperText, TextField, Autocomplete, Button, Chip, Paper } from '@mui/material';
// routes
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SvgIconStyle from '../../SvgIconStyle';
import { PATH_DASHBOARD } from 'routes/paths';
import { fDate } from '@/utils/formatTime';
import { deleteArticle } from 'apis/blog.api';
import toast from 'react-hot-toast';
// for modal
import { useMediaQuery } from '@mui/material';

import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { UploadSingleFile } from '@/components/upload';
import { LoadingButton } from '@mui/lab';
import BlogNewPostPreview from './BlogNewPostPreview';
const QuillEditor = dynamic(() => import('../editor/quill/index.js'), { ssr: false });
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

// ...

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Adjust the default width for smaller screens
  maxWidth: '400px', // Add a maximum width for larger screens
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Technology',
  'Sports',
  'IT',
  'Business',
  'Fashion',
  "Marketing",
  'Tips',
  'Uncategorized',
  'Travel',
  'Games',
  'Smart',
  'Web Design',
  'Web Development'
];

export default function BlogPostCard({ article, index }) {
  const { cover, metaTitle, content, tags, category, createdAt, views, share, _id } = article
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
    { number: views, icon: eyeFill },
    { number: share, icon: shareFill }
  ];

  // for modal
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [openPreview, setOpenPreview] = useState(false)
  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };
  const NewBlogSchema = Yup.object().shape({
    metaTitle: Yup.string().required('Meta Title is required'),
    // metaDescription: Yup.string().required('Meta Description is required'),
    content: Yup.string().min(500).required('Content is required'),
    tags: Yup.array()
      .of(Yup.string()) // Validate each item in the array as a string
      .min(1, 'At least one tag is required') // Ensure there's at least one tag
      .required('Tags is required'),
    category: Yup.string().required('Category is required'),
    cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik({
    initialValues: {
      metaTitle: '',
      content: '',
      cover: null,
      tags: ['Technology'],
      category: '',
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();

        // Append non-file form fields
        formData.append('metaTitle', values.metaTitle);
        formData.append('content', values.content);
        formData.append('category', values.category);
        formData.append('tags', values.tags);
        formData.append('cover', coverImage);


        const url = `${BLOG_URL}`;
        fetch(url, {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: formData
        })
          .then(res => res.json())
          .then(data => {
            // console.log('blog data posted', data);
            if (data.statusCode === 200) {
              toast.success(data?.message)
              resetForm()
            }
            else {
              toast.error(data?.message)
            }
          })










      } catch (error) {
        console.error('blog posted error', error);

      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setCoverImage(file)
        setFieldValue('cover', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

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
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '90%' : 'auto', // Adjust the width for mobile and remove maxWidth
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
              overflowY: 'auto', // Enable scrolling
              maxHeight: '90vh', // Limit the maximum height for scrolling
            }}>
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                      <Stack spacing={3}>
                        <div>
                          <LabelStyle>Cover</LabelStyle>
                          <UploadSingleFile
                            name="cover"
                            maxSize={3145728}
                            accept="image/*"
                            file={values.cover}
                            onDrop={handleDrop}
                            error={Boolean(touched.cover && errors.cover)}
                          />
                          {touched.cover && errors.cover && (
                            <FormHelperText error sx={{ px: 2 }}>
                              {touched.cover && errors.cover}
                            </FormHelperText>
                          )}
                        </div>


                        <div>
                          <LabelStyle>Content</LabelStyle>
                          <QuillEditor
                            id="post-content"
                            value={values.content}
                            onChange={(val) => setFieldValue('content', val)}
                            error={Boolean(touched.content && errors.content)}
                          />
                          {touched.content && errors.content && (
                            <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                              {touched.content && errors.content}
                            </FormHelperText>
                          )}
                        </div>


                      </Stack>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                      <Stack spacing={3}>
                        {/* <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div> */}
                        <TextField
                          fullWidth
                          label="Meta Title"
                          {...getFieldProps('metaTitle')}
                          error={Boolean(touched.metaTitle && errors.metaTitle)}
                          helperText={touched.metaTitle && errors.metaTitle}
                        />
                        <TextField
                          fullWidth
                          label="Category"
                          {...getFieldProps('category')}
                          error={Boolean(touched.category && errors.category)}
                          helperText={touched.category && errors.category}
                        />

                        <Autocomplete
                          multiple
                          freeSolo
                          value={values.tags}
                          onChange={(event, newValue) => {
                            console.log('Selected Tags:', newValue);
                            setFieldValue('tags', newValue);
                          }}
                          options={TAGS_OPTION.map((option) => option)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                            ))
                          }
                          renderInput={(params) => <TextField {...params} label="Tags" />}
                        />



                      </Stack>
                    </Card>

                    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                      <Button
                        fullWidth
                        type="button"
                        color="inherit"
                        variant="outlined"
                        size="large"
                        onClick={handleOpenPreview}
                        sx={{ mr: 1.5 }}
                      >
                        Preview
                      </Button>
                      <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                        Post
                      </LoadingButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>

            <BlogNewPostPreview formik={formik} openPreview={openPreview} onClosePreview={handleClosePreview} />

          </Paper>
        </Modal>
      )}

    </>
  );
}
