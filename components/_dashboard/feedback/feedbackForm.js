import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UploadAvatar } from '@/components/upload';
import { useCallback, useState } from 'react';
import { fData } from '@/utils/formatNumber';
import { FEEDBACK_URL } from 'apis/url';
import { toast } from 'react-hot-toast';


const FeedbackFormPage = () => {
    const [imageFile, setImageFile] = useState(null)
    const feedbackSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        feedbackDescription: Yup.string().min(50).required('Description is required'),
        positionName: Yup.string().required('Position name is required'),
        manImage: Yup.mixed().required('File is required')
        // .test('fileType', 'Invalid file type', (value) => {
        //     console.log('Uploaded file type:', value);
        //     return value && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
        // }),

    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            feedbackDescription: '',
            positionName: '',
            manImage: ''
        },


        validationSchema: feedbackSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                const formData = new FormData();
                // Append the nested "name" object
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('positionName', values.positionName);
                formData.append('feedbackDescription', values.feedbackDescription);
                formData.append('manImage', imageFile);


                const url = `${FEEDBACK_URL}`;
                await await fetch(url, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('feedback data posted', data);
                        if (data?.statusCode === 200) {
                            toast.success(data?.message);
                            resetForm();
                        } else {
                            toast.error(data?.message);
                        }
                    })


            } catch (error) {
                console.log('error', error);
            }
        }
    });

    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;


    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                // Add the file object to the values => file ta value hisabe onSubmit ee pauyar jonne
                // formik.setValues({
                //     ...values,
                //     manImage: file
                // });
                setImageFile(file)
                setFieldValue('manImage', {
                    ...file,
                    preview: URL.createObjectURL(file)
                });


            }
        },
        [setFieldValue, values, formik]
    );






    return (
        <>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={5}></Stack>
                            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                                <UploadAvatar
                                    name="manImage"
                                    accept="image/*"
                                    file={values.manImage}
                                    maxSize={3145728}
                                    onDrop={handleDrop}
                                    error={Boolean(touched.manImage && errors.manImage)}
                                    caption={
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 2,
                                                mx: 'auto',
                                                display: 'block',
                                                textAlign: 'center',
                                                color: 'text.secondary'
                                            }}
                                        >
                                            Allowed *.jpeg, *.jpg, *.png, *.gif
                                            <br /> max size of {fData(3145728)}
                                        </Typography>
                                    }
                                />

                                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                    {touched.manImage && errors.manImage}
                                </FormHelperText>

                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={{ xs: 2, md: 3 }}>
                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField fullWidth label="First Name" {...getFieldProps('firstName')}
                                            error={Boolean(touched.firstName && errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}>

                                        </TextField>
                                        <TextField fullWidth label="Last Name" {...getFieldProps('lastName')}
                                            error={Boolean(touched.lastName && errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}>

                                        </TextField>

                                    </Stack>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField fullWidth label="Job Position Name" {...getFieldProps('positionName')}
                                            error={Boolean(touched.positionName && errors.positionName)}
                                            helperText={touched.positionName && errors.positionName}
                                        />
                                    </Stack>

                                    <TextField {...getFieldProps('feedbackDescription')} fullWidth multiline minRows={4} maxRows={4} label="Feedback Description"
                                        error={Boolean(touched.feedbackDescription && errors.feedbackDescription)}
                                        helperText={touched.feedbackDescription && errors.feedbackDescription}
                                    />
                                </Stack>

                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                        CREATE FEEDBACK
                                    </LoadingButton>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>

            {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
        </>
    )
}

export default FeedbackFormPage