import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
// routes
// components
import { ResetPasswordForm } from '../../components/authentication/reset-password';
import { SentIcon } from 'assets/illustrations';
import Page from '@/components/Page';
import { PATH_AUTH } from 'routes/paths';
//

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Reset Password | Minimal UI">
      {/* <LogoOnlyLayout /> */}

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Forgot your password?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and We will email you a link to reset your
                password.
              </Typography>

              <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

              <Button fullWidth size="large" component='a' to={PATH_AUTH.login} sx={{ mt: 1 }}>
                Back
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to &nbsp;
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <Button size="large" variant="contained" component='a' to={PATH_AUTH.login} sx={{ mt: 5 }}>
                Back
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
