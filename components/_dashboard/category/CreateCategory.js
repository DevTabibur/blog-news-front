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
import { CATEGORY_URL } from 'apis/url';
import toast from 'react-hot-toast';




const CreateCategory = () => {

  const CategorySchema = Yup.object().shape({
    categoryName: Yup.string().required('Category Name is required'),
    categoryLink: Yup.string().required('Category Link is required')
  });

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      categoryLink:''
    },
    validationSchema: CategorySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const postData = {
          categoryName: values?.categoryName,
          categoryLink: values?.categoryLink
        }


        const url = `${CATEGORY_URL}`;
        fetch(url, {
          method: "POST",
          headers: {
            'content-type': 'application/json',
            // authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(postData)
        })
          .then(res => res.json())
          .then(data => {
            // console.log('category data posted', data);
            if(data?.statusCode === 200){
              toast.success(data?.message)
              resetForm()
            }
          })

      } catch (error) {
        console.error('category posted error', error);

      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;






  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Category Name"
                    {...getFieldProps('categoryName')}
                    error={Boolean(touched.categoryName && errors.categoryName)}
                    helperText={touched.categoryName && errors.categoryName}
                  />
                  <TextField
                    fullWidth
                    label="Category Link"
                    {...getFieldProps('categoryLink')}
                    error={Boolean(touched.categoryLink && errors.categoryLink)}
                    helperText={touched.categoryLink && errors.categoryLink}
                  />

                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                    SUBMIT CATEGORY
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>


          </Grid>
        </Form>
      </FormikProvider>
    </>
  )
}

export default CreateCategory