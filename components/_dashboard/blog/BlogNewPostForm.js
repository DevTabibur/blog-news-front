import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// utils
// import fakeRequest from 'utils/fakeRequest';

const QuillEditor = dynamic(() => import('../editor/quill/index.js'), { ssr: false });

import { UploadSingleFile } from '../../upload';
// //
import BlogNewPostPreview from './BlogNewPostPreview';
import { BLOG_URL } from 'apis/url';
import toast from 'react-hot-toast';

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

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const [open, setOpen] = useState(false);
  const [coverImage, setCoverImage] = useState(null)

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
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

      <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} />
    </>
  );
}
