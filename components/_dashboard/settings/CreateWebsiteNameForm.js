import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { Card, Grid, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {  createWebsiteName, getWebsiteName } from 'apis/settings.api';
import toast from 'react-hot-toast';



const CreateWebsiteNameForm = () => {
    const [websiteName, setWebsiteName] = useState('')
    
    useEffect(() => {
        const GetWebsiteNameFunction = async () => {
            const res = await getWebsiteName()
            setWebsiteName(res?.data[0])
            return (res?.data[0])
        }
        GetWebsiteNameFunction()
    }, [])


    const WebsiteNameSchema = Yup.object().shape({
        websiteName: Yup.string().required('Website Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            websiteName: '',
        },
        validationSchema: WebsiteNameSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const postData = {
                    websiteName: values?.websiteName,
                }

                const data = await createWebsiteName(postData)
                if (data?.statusCode === 200) {
                    toast.success(data?.message)
                    resetForm()
                }
                else {
                    toast.error(data?.message)
                }
            } catch (error) {
                console.error('website name posted error', error);

            }
        }
    });

    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <h6 style={{ marginBottom: '20px' }}>Current website Name is: {websiteName?.websiteName || `Don't have a NAME`}</h6>

                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Website Name"
                                        {...getFieldProps('websiteName')}
                                        error={Boolean(touched.websiteName && errors.websiteName)}
                                        helperText={touched.websiteName && errors.websiteName}
                                    />

                                </Stack>
                                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                                    <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                                        SUBMIT WEBSITE NAME
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

export default CreateWebsiteNameForm