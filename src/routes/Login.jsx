import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

// Mock credentials
const MOCK_EMAIL = 'user@example.com';
const MOCK_PASSWORD = 'password123';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate credentials
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      // Success - navigate to home
      navigate('/', { replace: true });
    } else {
      // Show error message
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.900',
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant='h4' component='h1' gutterBottom>
            Welcome back!
          </Typography>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            Please login to your account.
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
            aria-label='Login form'
          >
            {error && (
              <Alert severity='error' sx={{ mb: 2 }} role='alert'>
                {error}
              </Alert>
            )}

            <TextField
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              slotProps={{
                htmlInput: {
                  'aria-label': 'Email Address',
                  'aria-required': 'true',
                },
              }}
            />

            <TextField
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      onClick={handleTogglePasswordVisibility}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              slotProps={{
                htmlInput: {
                  'aria-label': 'Password',
                  'aria-required': 'true',
                },
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='large'
              startIcon={<LoginIcon />}
              sx={{ mt: 3, mb: 2 }}
              aria-label='Login to your account'
            >
              Login
            </Button>

            <Typography variant='caption' color='text.secondary' sx={{ mt: 2 }}>
              Demo credentials: {MOCK_EMAIL} / {MOCK_PASSWORD}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
