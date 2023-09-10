
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography, FormHelperText, Button, SvgIcon } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UploadAvatar } from '@/components/upload';
import { useCallback, useState } from 'react';
import { fData } from '@/utils/formatNumber';

// upload btn


const ProjectFormPage = () => {

    const [imageFile, setImageFile] = useState(null)
    const feedbackSchema = Yup.object().shape({
        // firstName: Yup.string().required("First name is required"),
        // lastName: Yup.string().required("Last name is required"),
        // feedbackDescription: Yup.string().min(100).required('Description is required'),
        // positionName: Yup.string().required('Position name is required'),
        manImage: Yup.mixed().required('File is required').test('fileType', 'Invalid file type', (value) => {
            console.log('Uploaded file type:', value);
            return value && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
        }),

    })

    const formik = useFormik({
        initialValues: {
            // firstName: '',
            // lastName: '',
            // feedbackDescription: '',
            // positionName: '',
            manImage: ''
        },


        validationSchema: feedbackSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                // const formData = new FormData();
                // formData.append('file', values.file);
                console.log('values', values.manImage);
                console.log('imageFile inside', imageFile);
                // const body = {
                //     name: {
                //         firstName: values?.firstName,
                //         lastName: values?.lastName
                //     },
                //     manImage: values?.manImage?.path,
                //     positionName: values?.positionName,
                //     feedbackDescription: values?.feedbackDescription
                // }
                // console.log('body', body);

                // const url = `${FEEDBACK_URL}`;
                // await fetch(url, {
                //     method: "POST",
                //     headers: {
                //         'content-type': 'application/json',
                //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
                //     },
                //     body: JSON.stringify(body)
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log('feedback data is posted', data);

                //         if (data?.statusCode === 200) {
                //             toast.success(data?.message)
                //             resetForm()
                //         }
                //         else {
                //             toast.error("Feedback create unsuccessful")
                //         }






                //     })






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
                console.log('handleDrop file', file);
                setImageFile(...file)
                setFieldValue('manImage', {
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
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={5}></Stack>
                            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                                <UploadAvatar
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
                                            <br />
                                            Project Front Image
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
                                    <TextField fullWidth label="Project Title" {...getFieldProps('projectTitle')}
                                        error={Boolean(touched.projectTitle && errors.projectTitle)}
                                        helperText={touched.projectTitle && errors.projectTitle}>

                                    </TextField>
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
                                        
                                        {/* <TextField fullWidth label="Image 1" {...getFieldProps('projectImage1')}
                                            error={Boolean(touched.projectImage1 && errors.projectImage1)}
                                            helperText={touched.projectImage1 && errors.projectImage1}>

                                        </TextField>
                                        <TextField fullWidth label="Image 2" {...getFieldProps('projectImage2')}
                                            error={Boolean(touched.projectImage2 && errors.projectImage2)}
                                            helperText={touched.projectImage2 && errors.projectImage2}>

                                        </TextField>
                                        <TextField fullWidth label="Image 3" {...getFieldProps('projectImage3')}
                                            error={Boolean(touched.projectImage3 && errors.projectImage3)}
                                            helperText={touched.projectImage3 && errors.projectImage3}>

                                        </TextField>
                                        <TextField fullWidth label="Image 4" {...getFieldProps('projectImage4')}
                                            error={Boolean(touched.projectImage4 && errors.projectImage4)}
                                            helperText={touched.projectImage4 && errors.projectImage4}>

                                        </TextField> */}


                                    </Stack>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField fullWidth label="Category (Design / Development)" {...getFieldProps('category')}
                                            error={Boolean(touched.category && errors.category)}
                                            helperText={touched.category && errors.category}
                                        />
                                        <TextField fullWidth label="Published At" {...getFieldProps('date')}
                                            error={Boolean(touched.date && errors.date)}
                                            helperText={touched.date && errors.date}
                                        />
                                    </Stack>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField {...getFieldProps('liveLink')} fullWidth label="Project Live Link"
                                            error={Boolean(touched.liveLink && errors.liveLink)}
                                            helperText={touched.liveLink && errors.liveLink}
                                        />
                                    </Stack>

                                    <TextField {...getFieldProps('description')} fullWidth multiline minRows={4} maxRows={4} label="Description"
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </Stack>

                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                        CREATE PROJECT
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

export default ProjectFormPage