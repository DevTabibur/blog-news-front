import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography, FormHelperText, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UploadAvatar } from '@/components/upload';
import { useCallback, useState } from 'react';
import { fData } from '@/utils/formatNumber';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { FAQ_URL } from 'apis/url.js';
const QuillEditor = dynamic(() => import('../editor/quill/index.js'), { ssr: false });


const FaqFormPage = () => {

    const LabelStyle = styled(Typography)(({ theme }) => ({
        ...theme.typography.subtitle2,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1)
    }));


    const feedbackSchema = Yup.object().shape({
        title: Yup.string().min(5).required("First name is required"),
        description: Yup.string().min(30).required('Description is required'),
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },


        validationSchema: feedbackSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                // const formData = new FormData();
                // formData.append('file', values.file);
                // console.log('values', values);
                const body = {
                    title: values?.title,
                    description: values?.description,
                }
                // console.log('body', body);

                const url = `${FAQ_URL}`;
                await fetch(url, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('feedback data is posted', data);

                        if (data?.statusCode === 200) {
                            toast.success(data?.message)
                            resetForm()
                        }
                        else {
                            toast.error("Feedback create unsuccessful")
                        }

                    })
            } catch (error) {
                console.log('error', error);
            }
        }
    });

    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={{ xs: 2, md: 3 }}>
                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField fullWidth label="Title" {...getFieldProps('title')}
                                            error={Boolean(touched.title && errors.title)}
                                            helperText={touched.title && errors.title}>

                                        </TextField>

                                    </Stack>
                                    <LabelStyle>Description</LabelStyle>
                                    <QuillEditor
                                        id="post-content"
                                        value={values.description}
                                        onChange={(val) => setFieldValue('description', val)}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                                            {touched.description && errors.description}
                                        </FormHelperText>
                                    )}
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
        </>
    )
}

export default FaqFormPage