import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UploadAvatar } from '@/components/upload';
import { useCallback, useState } from 'react';
import { fData } from '@/utils/formatNumber';
import { TEAM_URL } from 'apis/url';
import { toast } from 'react-hot-toast';

const TeamFormPage = () => {
    const [imageFile, setImageFile] = useState(null)
    const teamMemberSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        middleName: Yup.string().notRequired(), // optional
        lastName: Yup.string().required("Last name is required"),
        description: Yup.string().min(50).required('Description is required'),
        position: Yup.string().required('Position name is required'),
        facebook: Yup.string().notRequired(),
        linkedIn: Yup.string().notRequired(),
        twitter: Yup.string().notRequired(),
        github: Yup.string().notRequired(),
        memberImage: Yup.mixed().required('File is required')
        // .test('fileType', 'Invalid file type', (value) => {
        //     console.log('Uploaded file type:', value);
        //     return value && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
        // }),

    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            memberImage: '',
            position: '',
            description: '',
            facebook: '',
            linkedIn: '',
            twitter: '',
            github: ''
        },


        validationSchema: teamMemberSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                const formData = new FormData();
                formData.append('firstName', values?.firstName);
                formData.append('middleName', values?.middleName);
                formData.append('lastName', values?.lastName);
                formData.append('position', values?.position);
                formData.append('description', values?.description);
                formData.append('facebook', values?.facebook);
                formData.append('linkedIn', values?.linkedIn);
                formData.append('twitter', values?.twitter);
                formData.append('github', values?.github);
                formData.append('memberImage', imageFile);

                const url = `${TEAM_URL}`;
                await fetch(url, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('team member data is posted', data);

                        if (data?.statusCode === 200) {
                            toast.success(data?.message)
                            resetForm()
                        }
                        else {
                            toast.error("Team Member creation failed")
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
                setImageFile(file)
                setFieldValue('memberImage', {
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
                                    name="memberImage"
                                    accept="image/*"
                                    file={values.memberImage}
                                    maxSize={3145728}
                                    onDrop={handleDrop}
                                    error={Boolean(touched.memberImage && errors.memberImage)}
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
                                    {touched.memberImage && errors.memberImage}
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
                                        <TextField fullWidth label="Middle Name" {...getFieldProps('middleName')}
                                            error={Boolean(touched.middleName && errors.middleName)}
                                            helperText={touched.middleName && errors.middleName}>

                                        </TextField>
                                        <TextField fullWidth label="Last Name" {...getFieldProps('lastName')}
                                            error={Boolean(touched.lastName && errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}>

                                        </TextField>

                                    </Stack>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField fullWidth label="Job Position Name" {...getFieldProps('position')}
                                            error={Boolean(touched.position && errors.position)}
                                            helperText={touched.position && errors.position}
                                        />
                                    </Stack>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField fullWidth label="Facebook  Link" {...getFieldProps('facebook')}
                                            error={Boolean(touched.facebook && errors.facebook)}
                                            helperText={touched.facebook && errors.facebook}>

                                        </TextField>
                                        <TextField fullWidth label="LinkedIn  Link" {...getFieldProps('linkedIn')}
                                            error={Boolean(touched.linkedIn && errors.linkedIn)}
                                            helperText={touched.linkedIn && errors.linkedIn}>

                                        </TextField>
                                        <TextField fullWidth label="Twitter  Link" {...getFieldProps('twitter')}
                                            error={Boolean(touched.twitter && errors.twitter)}
                                            helperText={touched.twitter && errors.twitter}>

                                        </TextField>
                                        <TextField fullWidth label="GitHub  Link" {...getFieldProps('github')}
                                            error={Boolean(touched.github && errors.github)}
                                            helperText={touched.github && errors.github}>

                                        </TextField>

                                    </Stack>

                                    <TextField {...getFieldProps('description')} fullWidth multiline minRows={4} maxRows={4} label="Description"
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </Stack>

                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                        CREATE TEAM
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

export default TeamFormPage