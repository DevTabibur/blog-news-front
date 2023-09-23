

import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Box, Card, FormControlLabel, FormHelperText, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { registerUser } from 'apis/user.api';
import toast from 'react-hot-toast';
import { AUTH_URL } from 'apis/url';
// material



const CreateStuffForm = () => {

  const CreateStuffSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().min(6).required("Password is required")
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },

    validationSchema: CreateStuffSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {


        // ... rest of your code
        const body = {
          name: {
            firstName: values.firstName,
            lastName: values.lastName
          },
          email: values.email,
          password: values.password,
        }
        const url = `${AUTH_URL}/register`
        await fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(data => {
            // console.log('data posted', data);
            if (data.statusCode === 200) {
              toast.success(data.message)
              resetForm()
            }
            else {
              toast.error(data?.message)
            }
          })

      } catch (error) {
        console.error(error);

      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField fullWidth label="First Name" {...getFieldProps('firstName')}

                      error={Boolean(touched.firstName && errors.firstName)} // Update the path here as well
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField fullWidth label="Last Name" {...getFieldProps('lastName')}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField fullWidth label="Email Address" {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email} />
                  </Stack>


                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField fullWidth label="Password" {...getFieldProps('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}

                    />
                  </Stack>

                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Create Stuff
                  </LoadingButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  )
}

export default CreateStuffForm