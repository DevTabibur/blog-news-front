import { useEffect, useState, useCallback } from "react";
// mui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { deleteACategory, getAllCategory, updateCategory } from "apis/category.api";
import toast from "react-hot-toast";

// for modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// edit form data
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
// material
import { LoadingButton } from '@mui/lab';
import {
    Grid,
    Chip,
    Stack,
    Button,
    Switch,
    TextField,
    Autocomplete,
    FormHelperText,
    FormControlLabel
} from '@mui/material';
import { CATEGORY_URL } from "apis/url";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};



const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


const CategoryLists = () => {
    const [categories, setCategories] = useState([])
    const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);

    // modal
    const [open, setOpen] = useState(false);
    const [editedData, setEditedData] = useState({});
    const handleOpen = (data) => {
        setEditedData(data);
        // Store the _id of the category
        setCategoryIdToEdit(data._id);
        // Set the form values based on the clicked data
        formik.setValues({
            categoryName: data.categoryName,
            categoryLink: data.categoryLink,
        });
        setOpen(true);
    };
    const handleClose = () => setOpen(false);


    useEffect(() => {
        const getCategory = async () => {
            const res = await getAllCategory()
            setCategories(res?.data)
            return (res?.data)
        }
        getCategory()
    }, [])

    // delete a category
    const deleteButton = async (id) => {
        const confirmation = window.confirm("Do you want to DELETE?")
        if (confirmation) {
            const res = await deleteACategory(id);
            if (res?.statusCode === 200) {
                toast.success(res?.message)
                window.location.reload()
            }
            else {
                toast.error(res?.message)
            }
        }
    }
    // edit a category
    const CategorySchema = Yup.object().shape({
        categoryName: Yup.string().required('Category Name is required'),
        categoryLink: Yup.string().required('Category Link is required')
    });

    const formik = useFormik({
        initialValues: {
            categoryName: '',
            categoryLink: ''
        },
        validationSchema: CategorySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const updateData = {
                    categoryName: values?.categoryName,
                    categoryLink: values?.categoryLink
                }

                const result = await updateCategory(categoryIdToEdit, updateData)
                if (result?.statusCode === 200) {
                    toast.success(result?.message)
                    window.location.reload()
                }
                else {
                    toast.error(result?.message)
                }

                // i want to get here the update data _id. for fetching the data to update

            } catch (error) {
                console.error('category posted error', error);

            }
        }
    });

    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
    return (
        <>
            <Card
                sx={{
                    borderRadius: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)',
                }}
            >
                {categories?.length === 0 ? <>
                    <Card sx={{ padding: '20px', color: 'red' }}>
                        You don't have any category menu
                    </Card>
                </> : <CardContent>
                    <Typography sx={{ mt: 4, mb: 2, color: 'red' }} variant="h6" component="div">
                        Deleting a category menu can affect your news blog.
                    </Typography>
                    <Demo>
                        <List>
                            {categories.map((ct, i) => (
                                <ListItem
                                    key={i}
                                    sx={{
                                        backgroundColor: '#F4F4F4',
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: '8px',
                                        width: '100%',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <ListItemAvatar sx={{ fontSize: '30px' }}>
                                        {i + 1} •
                                    </ListItemAvatar>
                                    <ListItemText primary={ct?.categoryName} />
                                    <CardActions>
                                        <IconButton onClick={() => handleOpen(ct)} aria-label="edit" sx={{ color: 'green' }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteButton(ct?._id)} aria-label="delete" sx={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </CardContent>}

            </Card>

            {/* // modal */}
            {open && (
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            CATEGORY: {editedData?.categoryName}
                        </Typography>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            CATEGORY LINK: {editedData?.categoryLink}
                        </Typography>

                        <FormikProvider value={formik}>
                            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={8}>
                                        <Card sx={{ p: 3, position: 'relative' }}> {/* Set width to '100%' */}
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
                                                    UPDATE
                                                </LoadingButton>
                                            </Stack>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Form>
                        </FormikProvider>
                    </Box>
                </Modal>
            )}


        </>
    )
}

export default CategoryLists