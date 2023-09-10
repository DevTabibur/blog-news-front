import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
    Card,
    Chip,
    Grid,
    Stack,
    Radio,
    Switch,
    Select,
    TextField,
    InputLabel,
    Typography,
    RadioGroup,
    FormControl,
    Autocomplete,
    InputAdornment,
    FormControlLabel,
    FormHelperText
} from '@mui/material';
// editor
const QuillEditor = dynamic(() => import('../editor/quill/index.js'), { ssr: false });
// utils
import fakeRequest from '@/utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
import UploadSingleFile from '@/components/upload/UploadSingleFile.js';
import { toast } from 'react-hot-toast';
import { SERVICE_URL } from 'apis/url.js';


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
}));

// -----------------------------------------------------------------

const ServiceForm = () => {
    const [imageFile, setImageFile] = useState(null)

    const NewServiceSchema = Yup.object().shape({
        title: Yup.string().min(5).required('Title is required'),
        description: Yup.string().min(30).required('Description is required'),
        serviceImage: Yup.mixed().required('Image is required'),
    });

    const formik = useFormik({
        initialValues: {
            serviceImage: '',
            title: '',
            description: ''

        },
        validationSchema: NewServiceSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                const formData = new FormData();
                formData.append("title", values?.title)
                formData.append('description', values?.description)
                formData.append('serviceImage', imageFile)
                // console.log('values', values);
                // console.log('imageFile', imageFile);

                const url = `${SERVICE_URL}`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('service data posted', data);
                        if (data?.statusCode === 200) {
                            toast.success(data?.message)
                            resetForm()

                        }
                        else {
                            console.log('error', data);
                            toast.error(data?.message)
                        }
                    })











            } catch (error) {
                console.log('service data posted error');
            }
        }
    });

    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setImageFile(file)
                setFieldValue('serviceImage', {
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
                        <Grid item xs={12} md={12}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Service Title"
                                        {...getFieldProps('title')}
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                    />

                                    <div>
                                        <LabelStyle>Description</LabelStyle>
                                        <QuillEditor
                                            simple
                                            value={values?.description}
                                            onChange={(val) => setFieldValue('description', val)}
                                            error={Boolean(touched.description && errors.description)}
                                        />
                                        {touched.description && errors.description && (
                                            <FormHelperText error sx={{ px: 2 }}>
                                                {touched.description && errors.description}
                                            </FormHelperText>
                                        )}
                                    </div>

                                    <div>
                                        <LabelStyle>Add Images</LabelStyle>
                                        <UploadSingleFile
                                            showPreview
                                            maxSize={3145728}
                                            accept="image/*"
                                            files={values.serviceImage}
                                            onDrop={handleDrop}
                                            name="serviceImage"
                                            // onRemove={handleRemove}
                                            // onRemoveAll={handleRemoveAll}
                                            error={Boolean(touched.serviceImage && errors.serviceImage)}
                                        />
                                        {touched.serviceImage && errors.serviceImage && (
                                            <FormHelperText error sx={{ px: 2 }}>
                                                {touched.serviceImage && errors.serviceImage}
                                            </FormHelperText>
                                        )}
                                    </div>
                                    <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                                        SUBMIT
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

export default ServiceForm