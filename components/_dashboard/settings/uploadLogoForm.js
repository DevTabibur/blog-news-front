import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { Button, Card, FormHelperText, Grid, Stack, Typography, styled } from '@mui/material';
import { UploadSingleFile } from '@/components/upload';
import { LoadingButton } from '@mui/lab';
import { currentLogo, uploadLogo } from 'apis/settings.api';
import Image from 'next/image';
import toast from 'react-hot-toast';
// material


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
}));

const UploadLogoFormPage = () => {
    const [coverImage, setCoverImage] = useState(null)
    const [logo, setLogo] = useState([])

    const NewBlogSchema = Yup.object().shape({
        logo: Yup.mixed().required('Logo is required')
    });

    const formik = useFormik({
        initialValues: {
            logo: null
        },
        validationSchema: NewBlogSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const formData = new FormData();
                formData.append('logo', coverImage);

                const res = await uploadLogo(formData)
                // console.log('res', res);
                if (res?.statusCode === 200) {
                    toast.success(res?.message)
                }
                else {
                    toast.error(res?.message)
                }

            } catch (error) {
                console.error('logo upload is failed error', error);

            }
        }
    });

    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setCoverImage(file)
                setFieldValue('logo', {
                    ...file,
                    preview: URL.createObjectURL(file)
                });
            }
        },
        [setFieldValue])

    useEffect(() => {
        const retrieveLogo = async () => {
            const res = await currentLogo()
            setLogo(res?.data)
            return res?.data
        }
        retrieveLogo()
    }, [])

    // console.log('logo', logo[0].logo);
    return (
        <>
            <div style={{ marginBottom: '20px', }}>
                <h1>Current Logo is : </h1>
                <Image
                    src={`http://localhost:8000/${logo[0]?.logo}`}
                    width={150}
                    height={150}
                    alt="website logo"
                />
            </div>
            <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <div>
                                        <LabelStyle>Upload Logo</LabelStyle>
                                        <UploadSingleFile
                                            name="logo"
                                            maxSize={3145728}
                                            accept="image/*"
                                            file={values.logo}
                                            onDrop={handleDrop}
                                            error={Boolean(touched.logo && errors.logo)}
                                        />
                                        {touched.logo && errors.logo && (
                                            <FormHelperText error sx={{ px: 2 }}>
                                                {touched.logo && errors.logo}
                                            </FormHelperText>
                                        )}
                                    </div>



                                </Stack>
                            </Card>

                            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>

                                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                                    Upload Logo
                                </LoadingButton>
                            </Stack>
                        </Grid>


                    </Grid>
                </Form>
            </FormikProvider>
        </>
    )
}

export default UploadLogoFormPage