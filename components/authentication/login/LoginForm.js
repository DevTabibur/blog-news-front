import * as Yup from 'yup';
import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Link, Stack, Alert, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from 'routes/paths';
// hooks
//
import MIconButton from '../../@material-extend/MIconButton';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        const body = {
          email: values.email,
          password: values.password
        }

        const url = `http://localhost:8000/api/v1/auth/login`;
        await fetch(url, {
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(data => {
            // console.log('login data posted', data);
            if (data?.status === 'false' || data?.status === false) {
              console.log('data', data);
              toast.error(data?.message)
            }
            if (data?.message === "Validation Error") {
              toast.error(data?.errorMessages[0]?.message)
              console.log('object', data.errorMessages[0].message);

            }
            else if (data?.statusCode === 200) {

              localStorage.setItem('accessToken', data?.data?.accessToken)
              
              // Redirect to the previous page
              // window.location.replace(document.referrer);
              router.push('/dashboard')

              // showing the success message
              toast.success('Login Successful')

            }
            else {
              console.log('login error', data);
            }
          })

      } catch (error) {
        console.error(error);
        resetForm();

      }
    }
  });


  // useEffect(() => {
  //   // Access the previous page's URL
  //   const previousPageURL = document.referrer;
  //   console.log('Previous Page URL:', previousPageURL);

  //   // Access the current page's URL from the router
  //   const currentPageURL = router.asPath;
  //   console.log('Current Page URL:', currentPageURL);
  // }, [router]);

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link href='/reset-password' component='a' variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
