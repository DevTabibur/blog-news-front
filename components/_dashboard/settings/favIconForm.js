import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { Card, FormHelperText, Grid, Stack, Typography, styled } from '@mui/material';
import { UploadSingleFile } from '@/components/upload';
import { LoadingButton } from '@mui/lab';
import { uploadFavIcon } from 'apis/settings.api';


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
}));

const FavIconFormPage = () => {
    const [favIcon, setFavIcon] = useState(null)
    const [logo, setLogo] = useState([])

    const NewBlogSchema = Yup.object().shape({
        favIcon: Yup.mixed().required('Fav Icon is required')
    });

    const formik = useFormik({
        initialValues: {
            favIcon: null
        },
        validationSchema: NewBlogSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const formData = new FormData();
                formData.append('favIcon', favIcon);
                console.log('favIcon', favIcon);

                const res = await uploadFavIcon(formData)
                // console.log('res', res);
                if (res?.statusCode === 200) {
                    toast.success(res?.message)
                }
                else {
                    toast.error(res?.message)
                }

            } catch (error) {
                console.error('favIcon upload is failed error', error);

            }
        }
    });

    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setFavIcon(file)
                setFieldValue('favIcon', {
                    ...file,
                    preview: URL.createObjectURL(file)
                });
            }
        },
        [setFieldValue])
    return (
        <>
            {/* <div style={{ marginBottom: '20px', }}>
                <h1>Current Logo is : </h1>
                <Image
                    src={`http://localhost:8000/${logo[0]?.logo}`}
                    width={150}
                    height={150}
                    alt="website logo"
                />
            </div> */}
            <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <div>
                                        <LabelStyle>Upload Logo</LabelStyle>
                                        <UploadSingleFile
                                            name="favIcon"
                                            maxSize={3145728}
                                            accept="image/*"
                                            file={values.favIcon}
                                            onDrop={handleDrop}
                                            error={Boolean(touched.favIcon && errors.favIcon)}
                                        />
                                        {touched.favIcon && errors.favIcon && (
                                            <FormHelperText error sx={{ px: 2 }}>
                                                {touched.favIcon && errors.favIcon}
                                            </FormHelperText>
                                        )}
                                    </div>



                                </Stack>
                            </Card>

                            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>

                                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                                    Upload Fav Icon
                                </LoadingButton>
                            </Stack>
                        </Grid>


                    </Grid>
                </Form>
            </FormikProvider>
        </>
    )
}

export default FavIconFormPage